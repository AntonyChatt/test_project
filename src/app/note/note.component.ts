import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import EditorJS from "@editorjs/editorjs";

import { Note } from "../note"
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent implements OnInit{
  note : Note | undefined;
  editor: any;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private location: Location
    ) {}

  ngOnInit(): void {
    this.getNote();

    this.editor = new EditorJS( {
      holderId: 'editor-js',
     
    });
  }

  getNote(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noteService.getNote(id).subscribe(note => this.note = note)
  }

  goBack(): void {
    this.location.back();
  }
}
