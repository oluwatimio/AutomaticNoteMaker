export class Note {
  concepts: string[];
  title: string;
  note: string;
  textSize: string;
  date: string;

  constructor(concepts: string[], title: string, note: string, textSize: string) {
    this.concepts = concepts;
    this.title = title;
    this.note = note;
    this.textSize = textSize;
  }
}
