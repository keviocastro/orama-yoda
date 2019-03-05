import firebase from 'firebase';
import 'firebase/firestore';
import { FIREBASE_CREDENTIALS } from './env';

firebase.initializeApp(FIREBASE_CREDENTIALS);

const db = firebase.firestore();

const GET_LIST = 'GET_LIST';
const GET_ONE = 'GET_ONE';
const GET_MANY = 'GET_MANY';
const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

export default (apiUrl, httpClient) => {

    const setupDefaultGetListParams = params => {
        if (params.sort.field === "id") {
            params.sort.field = "name";
        }

        if (params.sort.order === undefined) {
            params.sort.order = 'ASC';
        }
    }

    const convertImageToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const identifyFieldsFromParams = (params) => {
        let imagesField = [];
        Object.keys(params.data).forEach(property => {
            if (Array.isArray(params.data[property])) {
                params.data[property].forEach(propertyArrayItem => {
                    if (propertyArrayItem.hasOwnProperty('rawFile') && propertyArrayItem['rawFile'].type.indexOf('image') !== -1) {
                        imagesField.push(property)
                    }
                })
            }
        })

        return imagesField;
    }

    const createPromisesToConvertImages = (type, resource, params) => {
        // @todo Support only one image by property
        let promises = [];
        let imagesField = identifyFieldsFromParams(params);

        imagesField = imagesField.filter(imageField => {
            return imageField in params.data ? imageField : false;
        })
        imagesField.forEach(imageField => {
            if (imageField in params.data) {
                promises.push(convertImageToBase64(params.data[imageField][0].rawFile));
            }
        })

        return Promise.all(promises).then(convertedImages => {

            imagesField.forEach((imageField, index) => {
                if (imageField in params.data) {
                    params.data[imageField] = convertedImages[index];
                }
            });

            if (type === CREATE) {
                return db.collection(resource).add(params.data).then(snapshot => {
                    // Set field "id" for search in GET_MANY action
                    let docRef = db.collection(resource).doc(snapshot.id);
                    docRef.update({ id: snapshot.id });

                    return convertSnaphot(snapshot, type, resource, params);
                });
            } else if (type === UPDATE) {
                let docRef = db.collection(resource).doc(params.id);
                return docRef.update(params.data).then(snapshot => {
                    return convertSnaphot(snapshot, type, resource, params);
                });
            }
        });
    }

    const action = (type, resource, params) => {

        let docRef;
        let query;
        switch (type) {
            case GET_LIST:
                setupDefaultGetListParams(params);
                query = db.collection(resource).orderBy(params.sort.field.toLowerCase(), params.sort.order.toLowerCase());
                Object.keys(params.filter).forEach(filterName => {
                    if (Array.isArray(params.filter[filterName])) {
                        params.filter[filterName].forEach(filterValue => {
                            query = query.where(filterName, 'array-contains', filterValue);
                        })
                    } else {
                        query = query.where(filterName, '==', params.filter[filterName]);
                    }
                })

                return query.get()
                    .then(snapshot => {
                        return convertSnaphot(snapshot, type, resource, params);
                    });

            case GET_ONE:
                return db.collection(resource).doc(params.id).get().then(snapshot => {
                    return convertSnaphot(snapshot, type, resource, params);
                });

            case GET_MANY:
                docRef = db.collection(resource);
                params.ids.forEach(id => {
                    docRef.where('id', '==', id);
                })
                return docRef.get()
                    .then(snapshot => {
                        return convertSnaphot(snapshot, type, resource, params);
                    });

            case GET_MANY_REFERENCE:
                console.log('tes')
                break;

            case CREATE:
                return createPromisesToConvertImages(type, resource, params);

            case UPDATE:
                return createPromisesToConvertImages(type, resource, params);

            case DELETE:
                return db.collection(resource).doc(params.id).delete()
                    .then(() => {
                        return convertSnaphot(null, type, resource, params);
                    });

            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
    };

    const convertSnaphot = (snapshot, type, resource, params) => {
        let docs = [];
        switch (type) {
            case GET_LIST:
                snapshot.forEach(record => {
                    docs.push({ id: record.id, ...record.data() });
                })
                return {
                    data: docs,
                    total: docs.length
                };

            case GET_ONE:
                return {
                    data: snapshot.data()
                }

            case GET_MANY:
                snapshot.forEach(record => {
                    docs.push({ id: record.id, ...record.data() });
                });
                return {
                    data: docs
                };

            case GET_MANY_REFERENCE:

                break;
            case CREATE:
                return { data: { ...params.data, id: snapshot.id } };
            case UPDATE:
                return { id: params.id, data: params.data, previousData: params.previousData };

            case DELETE:
                return { data: params.previousData };
            default:
                return { data: docs };
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
        return action(
            type,
            resource,
            params
        );
    };
};