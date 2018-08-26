import * as firebase from 'firebase';
export const environment = {
  production: true,
  config: {
    apiKey: 'AIzaSyAvYC5oYcwDdMMAxBgMvxP1RgNFkSafpCo',
    authDomain: 'antnotes-59ca8.firebaseapp.com',
    databaseURL: 'https://antnotes-59ca8.firebaseio.com',
    projectId: 'antnotes-59ca8',
    storageBucket: '',
    messagingSenderId: '1089893275571'
  }
};

firebase.initializeApp(environment.config);
