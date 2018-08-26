import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: Router;
  user: Observable<any>;
  constructor(router: Router) {
    this.router = router;
    this.user = new Observable((Observer) => {
      this.observe(Observer);
    });
  }
  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigateByUrl('tabs');
    }).catch((error) => {
      console.log(error.code);
      if (error.code === 'auth/user-not-found') {
        this.signUp(email, password);
      } else if (error.code === 'auth/wrong-password') {
        alert('Wrong user name or password');
      }
    });
  }

  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
      this.router.navigateByUrl('tabs');
    }).catch((error) => {
      alert(error.message);
    });
  }
  observe(observer) {
    firebase.auth().onAuthStateChanged((user) => {
      observer.next(user);
    });
  }
}
