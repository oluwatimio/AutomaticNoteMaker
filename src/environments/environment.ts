// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
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

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
