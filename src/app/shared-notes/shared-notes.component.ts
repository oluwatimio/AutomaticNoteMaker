import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../notes/Note';
import {NoteDownloaded} from '../notes/NoteDownloaded';
import * as firebase from 'firebase';
import {MatSnackBar} from '@angular/material';

declare var require: any;

@Component({
  selector: 'app-shared-notes',
  templateUrl: './shared-notes.component.html',
  styleUrls: ['./shared-notes.component.css']
})
export class SharedNotesComponent implements OnInit {
  textSizes = [9, 10, 11, 12, 13, 14, 18, 24, 36, 48, 64, 72];
  concepts: string[] = new Array();
  concept: string;
  noteTitle: string;
  noteContent: string;
  textSize: string;
  keywordName: string;
  extract: string;
  noteDialog: any;
  wikiDialog: any;
  shareDialog: any;
  userNotes: NoteDownloaded[] = new Array();
  viewingNote: NoteDownloaded;
  constructor(private http: HttpClient, public snackbar: MatSnackBar) { 
    this.concept = '';
    this.noteTitle = '';
    this.noteContent = '';
    this.textSize = '20px';
    this.keywordName = '';
    this.extract = '';
  }

  ngOnInit() {
    this.downloadNotes("0000");
  }

  downloadNotes(shareCode: string) {
    this.userNotes = new Array();

    this.http.get<NoteDownloaded[]>('https://notarai.lib.id/notearai@0.0.5/?sharecode=' + shareCode).subscribe((notes) => {
      notes.forEach((note) => {
        var docRef = note[1];
        console.log(docRef);
        const newNote = new NoteDownloaded(note[0]['concepts'], note[0]['noteTitle'], note[0]['noteContent'], note[0]['textSize'], docRef);
        this.userNotes.push(newNote);
      });
    });
  }

  getData(clicked: string) {
    this.http.jsonp('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&exsectionformat=plain&titles=' + clicked, 'callback').subscribe((data) => {
      var pages = data['query']['pages'];
      var obj = pages[Object.keys(pages)[0]]['extract'];
      var short = '"' + obj.split('\n\n')[0] + '\n\n' + obj.split('\n\n')[1] + '"' + '\n\n' + '-Wikipedia';
      this.extract = short;
      console.log(this.extract);
    });
  }

  openDiag() {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    this.noteDialog = new MDCDialog(document.querySelector('#myd'));

    this.noteDialog.show();
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

  openShareDialog() {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    this.shareDialog = new MDCDialog(document.querySelector('#shareDialog'));
    this.shareDialog.show();
  }

  changeTextSizes(number: any) {
    console.log(number);
    document.getElementById('textSize').style.fontSize = number.toString() + 'px';
    this.textSize = number.toString();
  }

  addConcept() {
    if (this.concept !== '') {
      this.concepts.push(this.concept);
      this.concept = '';
    }
  }

  saveNote() {
    const note = new Note(this.concepts, this.noteTitle, this.noteContent, this.textSize);

    const db = firebase.firestore();

    db.collection('userNotes').add({
      concepts: this.concepts,
      noteTitle: this.noteTitle,
      noteContent: this.noteContent,
      textSize: this.textSize
    });

    this.concepts = new Array();
    this.noteTitle = '';
    this.noteContent = '';
    this.textSize = '';
    this.noteDialog.close();
  }

  closeWikiDialog() {
    this.wikiDialog.close();
  }

  closeShareDialog() {
    this.shareDialog.close();
  }

  addToNote(text: string) {
    this.noteContent = this.noteContent + '\n\n' + text;
    this.wikiDialog.close();
  }

  viewNote(note: NoteDownloaded) {
    this.noteTitle = note.title;
    this.concepts = note.concepts;
    this.noteContent = note.note;
    this.viewingNote = note;
    document.getElementById('textSize').style.fontSize = note.textSize + 'px';

    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    this.noteDialog = new MDCDialog(document.querySelector('#viewandEdit'));

    this.noteDialog.show();
  }

  updateNote() {
    const db = firebase.firestore().collection('userNotes').doc(this.viewingNote.docRef).update({
      concepts: this.concepts,
      noteTitle: this.noteTitle,
      noteContent: this.noteContent,
      textSize: this.textSize,
    }).then(() => {
      this.closeDiag();
      this.concepts = new Array();
      this.noteTitle = '';
      this.noteContent = '';
      this.textSize = '';
      this.snackbar.open('Note Updated', null, {duration: 5000});
    });
  }

  closeDiag() {
    const mdcDialog = require('@material/dialog');
    const MDCDialog = mdcDialog.MDCDialog;
    const MDCDialogFoundation = mdcDialog.MDCDialogFoundation;
    const util = mdcDialog.util;

    this.noteDialog = new MDCDialog(document.querySelector('#viewandEdit'));

    this.noteTitle = '';
    this.concepts = new Array();
    this.noteContent = '';
    this.viewingNote = undefined;

    this.noteDialog.close();
  }

}
