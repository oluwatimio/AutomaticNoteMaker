export class NoteDownloaded {
  concepts: string[];
  title: string;
  note: string;
  textSize: string;
  docRef: string;

  constructor(concepts: string[], title: string, note: string, textSize: string, docRef: string) {
    this.concepts = concepts;
    this.title = title;
    this.note = note;
    this.textSize = textSize;
    this.docRef = docRef;
  }
}
