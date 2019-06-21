import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'admin-on-rest';
import firebase from './firebaseAuth'
const db = firebase.firestore();

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    return db.collection('admins')
      .where('user', '==', username)
      .where('password', '==', password)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length >= 1) {
          localStorage.setItem('token', snapshot.docs[0].id);
        } else {
          throw new Error('Senha ou usuário inválido');
        }
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    window.location.href = "https://o-rama2.firebaseapp.com/#login";
  }
  if (type === AUTH_ERROR) {
    throw new Error('Ops... Você precisa estar logado para acssar essa página');
  }
  if (type === AUTH_CHECK) {
    let token = localStorage.getItem('token');
    let check = typeof token === 'string' && token.length === 20;
    return check ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
};