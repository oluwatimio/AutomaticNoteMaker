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
  keywordName: string;
  extract: string;
  wikiDialog: any;
  constructor(private http: HttpClient) {
    this.concept = '';
    this.noteTitle = '';
    this.noteContent = '';
    this.textSize = '20px';
    this.keywordName = '';
    this.extract = '';
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

  openWikiDialog(clicked: string) {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    this.wikiDialog = new MDCDialog(document.querySelector('#wikiDialog'));

    this.keywordName = clicked;
    this.getData(clicked);

    this.wikiDialog.show();
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

  addToNote(text: string) {
    this.noteContent = this.noteContent + '\n\n' + text;
    this.wikiDialog.close();
  }

  getData(clicked: string) {
    this.http.jsonp('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsectionformat=plain&titles=' + clicked, 'callback').subscribe((data) => {
      var pages = data['query']['pages'];
      var obj = pages[Object.keys(pages)[0]]['extract'];
      var short = obj.split('\n')[0] + '\n' + obj.split('\n')[1] + '\n' + obj.split('\n')[2] + 
      obj.split('\n')[3] + '\n' + obj.split('\n')[4] + '\n' + obj.split('\n')[5] + 
      obj.split('\n')[6] + '\n' + obj.split('\n')[7] + '\n' + obj.split('\n')[8];
      this.extract = short;
      console.log(short);
    });
  }

}
