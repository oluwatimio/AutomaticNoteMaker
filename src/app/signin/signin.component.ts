import { Component, OnInit } from '@angular/core';
import {MDCTextField} from '@material/textfield';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  router: Router;
  constructor(router: Router) {
    this.email = '';
    this.password = '';
    this.router = router;
  }

  ngOnInit() {

    const textField = new MDCTextField(document.querySelector('.email'));
    const textField2 = new MDCTextField(document.querySelector('.passt'));
  }

  signIn() {
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.router.navigateByUrl('/');
    }).catch((error) => {
      console.log(error.code);
      if (error.code === 'auth/user-not-found') {
        this.signUp();
      } else if (error.code === 'auth/wrong-password') {
        alert('Wrong user name or password');
      }
    });
  }
  signUp() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((response) => {
      this.router.navigateByUrl('/');
    }).catch((error) => {
      alert(error.message);
    });
  }

}
