import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import * as firebase from 'firebase';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  typesOfPerson: string[] = ['Professor', 'Student'];
  auths: AuthService;
  user: any;
  router: Router;
  constructor(public snack: MatSnackBar, auths: AuthService, router: Router) {
    this.auths = auths;
    this.router = router;
  }

  ngOnInit() {
    this.auths.user.subscribe((user) => {
      if (user !== undefined && user !== null) {
        this.user = user;
      }
    });
  }

  goNext(selected: any) {
    if (selected.length > 1) {
      this.snack.open('You have selected more than one option', null, {duration: 5000});
    } else if (selected.length === 1) {
      const db = firebase.firestore();
      db.collection('UserPrefs').doc(this.user.uid).set({
        pref: selected.value,
        uid: this.user.uid
      }).then(() => {

        if (selected.value === 'Professor') {
          this.router.navigateByUrl('createclassroom');
        } else if (selected.value === 'Student') {
          this.router.navigateByUrl('addclassroom');
        }
      });
    }
  }

}
