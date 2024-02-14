import { Component, OnInit } from '@angular/core';

import { Note } from "../note"
import { NoteService } from '../note.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit{
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {    
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      //sort by time
      this.notes = notes
    });
  }
}


//add deletion
//readonly editor 
//diff render images