import { Component, OnInit } from '@angular/core';
import {Note} from './Note';
import {HttpClient} from '@angular/common/http';

declare var require: any;

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  textSizes = [9, 10, 11, 12, 13, 14, 18, 24, 36, 48, 64, 72];
  concepts: string[] = new Array();
  concept: string;
  noteTitle: string;
  noteContent: string;
  textSize: string;
  constructor(private http: HttpClient) {
    this.concept = '';
    this.noteTitle = '';
    this.noteContent = '';
    this.textSize = '20px';
  }

  ngOnInit() {
  }

  openDiag() {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    const dialog = new MDCDialog(document.querySelector('#myd'));

    dialog.show();


  }

  changeTextSizes(number: any) {
    console.log(number);
    document.getElementById('textSize').style.fontSize = number.toString() + 'px';
    this.textSize = number.toString();
  }

  addConcept() {
    if (this.concept != '') {
      this.concepts.push(this.concept);
      this.concept = '';
    }
  }

  saveNote() {
    const note = new Note(this.concepts, this.noteTitle, this.noteContent, this.textSize);
  }


  getData() {
    this.http.jsonp('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsectionformat=plain&titles=anatomy', 'callback').subscribe((data) => {
      console.log(data);
    });
  }

}
