import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const notes = [
      {
        id: 1,
        editor: {
          time: 1707904815678,
          version: "2.29.0",
          blocks: [
            {
              data: {
                text: "rtrtrt"
              },
              id: "EDGTlDe4JT",
              type: "paragraph"
            },
          ]
        }
      },
      {
        id: 2,
        editor: {
          time: 1707906699752,
          version: "2.29.0",
          blocks: [
            {
              data: {
                text: "retertertretewrtwed"
              },
              id: "EDGTlDe4JT",
              type: "paragraph"
            },
          ]
        }
      },
      {
        id: 3,
        editor: {
          time: 1707899532825,
          version: "2.29.0",
          blocks: [
            {
              data: {
                url: "https://i.pinimg.com/originals/e3/f2/bf/e3f2bf1268c8e486ee37e4570bce22ff.jpg",
                caption: "treyhdhxgf",
                withBorder: false,
                withBackground: false,
                stretched: false
              },
              id: "EDGTlDe4JT",
              type: "image"
            },
          ]
        }
      },
      {
        id: 4,
        editor: {
          time: 1707904819967,
          version: "2.29.0",
          blocks: [
            {
              data: {
                text: '<u class="cdx-underline">yrey</u>rey'
              },
              id: "EDGTlDe4JT",
              type: "paragraph"
            },
          ]
        }
      }
    ];
    return {notes}
  }

  genId(notes: Note[]): number {
    return notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1;
  }
}
