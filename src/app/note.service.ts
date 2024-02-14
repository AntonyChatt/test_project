import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notesUrl = 'api/notes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
    .pipe(
      catchError(this.handleError<Note[]>('getNotes', []))
    )
  }

  getNote(id: Number): Observable<Note> {
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      catchError(this.handleError<Note>(`getNote id=${id}`))
    )
  }

  updateNote(note: Note): Observable<any> {
    return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateNote'))
    );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
      catchError(this.handleError<Note>('addNote'))
    );
  } 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
