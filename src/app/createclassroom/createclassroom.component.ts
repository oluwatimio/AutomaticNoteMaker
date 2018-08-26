import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-createclassroom',
  templateUrl: './createclassroom.component.html',
  styleUrls: ['./createclassroom.component.css']
})
export class CreateclassroomComponent implements OnInit {
  classcode: string;
  classcodes: string[];
  auths: AuthService;
  user: any;
  router: Router;
  constructor(auths: AuthService, public snackbar: MatSnackBar, router: Router) {
    this.classcode = '';
    this.router = router;
  }

  ngOnInit() {
    this.auths.user.subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
      }
    });
  }


  createClass() {
    this.classcodes.push(this.classcode);
    const db = firebase.firestore();

    db.collection('UserPrefs').doc(this.user.uid).update({
      classcodes: this.classcode
    }).then(() => {
      this.snackbar.open('Classroom Added', null, {duration: 5000});
      this.router.navigateByUrl('')
    });
  }

}
