import { Component, OnInit } from '@angular/core';
import {MDCTextField} from '@material/textfield';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  router: Router;
  auths: AuthService;
  constructor(router: Router, auths: AuthService) {
    this.email = '';
    this.password = '';
    this.router = router;
    this.auths = auths;
  }

  ngOnInit() {

    const textField = new MDCTextField(document.querySelector('.email'));
    const textField2 = new MDCTextField(document.querySelector('.passt'));
  }

  signIn() {
    this.auths.signIn(this.email, this.password);
  }

}
