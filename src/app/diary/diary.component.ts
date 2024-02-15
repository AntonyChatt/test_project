import { Component, OnInit } from '@angular/core';

import { Note, NotePreview } from "../note"
import { Editor, RowDataImage, RowDataText } from '../editor';

import { NoteService } from '../note.service';

/*
  This component gets a list of notes of the Note type and converts them
  to the NotePreview type. To display a preview of the recordings, the
  content is displayed (part of the content is cropped to the size of the
  output block). If there were pictures in the recording, the first of these
  pictures is displayed in the side window, otherwise the placeholder text 
  (alt) is displayed

  Below is a more concise example of displaying via readonly
  The Editorjs component. However, such an implementation required making 
  the preview component is separate, which I didn't have enough time
  for at the moment. TODO it later
*/

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit{
  notes: NotePreview[] = [];
  editors: Editor[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {    
    this.getNotes();
  }

  separateTextFromImages(notes: Note[]): NotePreview[] {
    return notes.map((note: Note) => {
      let image = "", text: string[] = [];
      note.editor.blocks.forEach((block) => {
        if ( block.type === "image") {
          const imageData = block.data as RowDataImage;
          image === "" ? image = imageData.url : image;
          text.push(imageData.caption);
        }
        else {
          const textData = block.data as RowDataText;
          text.push(textData.text);
        }
      });

      return {
        id: note.id,
        text: text,
        image: image,
        date: new Date(note.editor.time)
      } as NotePreview;
    });
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      notes.sort((a, b) => Number(b.editor.time) - Number(a.editor.time))  //sort by time
      let notesSeparated = this.separateTextFromImages(notes);
      this.notes = notesSeparated;
    });
  }
}


// this.notes.forEach((note :Note) => {
//   let editor = new EditorJS({
//     holder: `editor-js-${note.id}`,
//     autofocus: true,
//     tools: {
//       image: SimpleImage,
//       underline: Underline
//     },
//     readOnly: true
//   });

//   editor.isReady
//   .then(() => {
//       editor.render(note.editor);
//   })
//   .catch((reason : string) => {
//       console.log(`Editor.js initialization failed because of ${reason}`);
//   });
// });