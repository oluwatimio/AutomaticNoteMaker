import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: Router;
  user: Observable<any>;
  constructor(router: Router, public snackbar: MatSnackBar) {
    this.router = router;
    this.user = new Observable((Observer) => {
      this.observe(Observer);
    });
  }
  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      this.snackbar.open('Hey you!, Welcome back :)', null, {duration: 5000});
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
      this.snackbar.open('Hey you!, Welcome to Notar.ai :)', null, {duration: 5000});
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
