import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import EditorJS from "@editorjs/editorjs";
import Underline from '@editorjs/underline';
import SimpleImage from "@editorjs/simple-image";

import { Note } from "../note"
import { NoteService } from '../note.service';
import { Editor } from '../editor';

/*
  This component implements the logic of creating and editing a record
  If the record is uploaded successfully, the "save" button calls the
  record update method, otherwise the record is created
  Also, the "undo changes" button returns the editor state to the
  original one or clears it.
*/
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit{
  actionTitle = "Редактирование";
  isEditing = true;
  note : Note | undefined;
  editor: any;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.editor = new EditorJS( {
      holder: 'editor-js',
      autofocus: true,
      tools: {
        image: SimpleImage,
        underline: Underline
      } 
    });
    this.getNote();
  }

  initNote(): void {
    this.actionTitle = "Создание";
    this.isEditing = false;
  }

  getNote(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.noteService.getNote(id)
    .subscribe(note => {
      this.note = note;
      note === undefined ? this.initNote() : this.editor.isReady
        .then(() => {
            this.editor.render(this.note?.editor);
        })
        .catch((reason : string) => {
            console.log(`Editor.js initialization failed because of ${reason}`);
        });
    })
  }

  onDelete(): void {  // Delete note
    this.note === undefined ? this.goBack() : this.noteService.deleteNote(this.note.id)
      .subscribe(() => this.goBack())
  }

  goBack(): void {   // Discard changes and go back
    this.location.back();
  }

  onClear(): void {  // Undo changes to original state
    this.note ? this.editor.isReady
    .then(() => {
        this.editor.render(this.note?.editor);
    })
    .catch((reason : string) => {
        console.log(`Editor.js initialization failed because of ${reason}`);
    })
    : this.editor.blocks.clear();
  }

  onSave(): void {  // Save changes
    this.editor.save().then((savedData: Editor) => {
      if (this.isEditing && this.note) {
        this.note.editor = savedData;
        this.noteService.updateNote(this.note).subscribe(() => this.goBack());
      }
      else {
        this.noteService.addNote({ editor: savedData } as Note).subscribe(() => this.goBack());
      }      
    })
  }
}
