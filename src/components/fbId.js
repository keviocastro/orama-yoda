import React from 'react';
import FacebookLogin from 'react-facebook-login';
import firebase from './../firebaseAuth'
const db = firebase.firestore();

const responseFacebook = (response, source, record) => {
    record.fb_id = response.userID;
    record.fb_token = response.accessToken;

    let docRef = db.collection('partners').doc(record.id);
    return docRef.update({
        fb_id: record.fb_id,
        fb_token: record.fb_token
    });
}

const FbId = ({ source, record = {} }) => (
    <FacebookLogin
        appId="410996659284985"
        autoLoad={true}
        fields="name,email,picture"
        scope="user_posts,user_friends"
        callback={(response) => { responseFacebook(response, source, record) }}
    />
);

export default FbId;
