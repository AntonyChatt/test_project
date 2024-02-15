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
          time: 1707989940253,
          version: "2.29.0",
          blocks: [
            {
              data: {
                text: "Сегодня у нас в семье появился котик. Мы его назвали <b>Барсик</b>"
              },
              id: "EDGTlDe4JT",
              type: "paragraph"
            },
            {
              data: {
                url: "http://s4.fotokto.ru/photo/full/576/5767073.jpg",
                caption: "Барсик в первый день",
                withBorder: false,
                withBackground: false,
                stretched: false
              },
              id: "Y489HcRQUV",
              type: "image"
            }
          ]
        }
      },
      {
        id: 2,
        editor: {
          time: 1707990269917,
          version: "2.29.0",
          blocks: [
            {
              data: {
                text: "Свозили Барсика к ветеринару. В целом он здоров, но нужно пропить таблетки от гильминтов. Прописал <b>ПрепаратОтГлистов</b> в дозе <u class=\"cdx-underline\">1\\2</u> таблетки раз в <i>2 недели</i>"
              },
              id: "QP1Zsadebh",
              type: "paragraph"
            },
            {
              data: {
                text: 'ему не нравятся эти таблетки, но жизнь не всегда так хороша как мы хотим'
              },
              id: "ecp9h1jdeT",
              type: "paragraph"
            },
            {
              data: {
                text: '<i>Не все коту масленица</i>'
              },
              id: "fvrPxc6WxW",
              type: "paragraph"
            }
          ]
        }
      },
      {
        id: 3,
        editor: {
          time: 1707990662648,
          version: "2.29.0",
          blocks: [
            {
              data: {
                text: 'Прочитала в интернете какая у него порода.'
              },
              id: "KUWdKobvIM",
              type: "paragraph"
            },
            {
              data: {
                text: 'Точнее не порода, а окрас.<a href="https://ru.wikipedia.org/wiki/Табби_(окрас)">Табби</a>'
              },
              id: "j8ri0Zg2aI",
              type: "paragraph"
            },
            {
              data: {
                text: 'Он очень послушный и ласковый котик теперь я буду …предыдущие хозяева его выкинули на обочину жизни.'
              },
              id: "mNUktzsbyv",
              type: "paragraph"
            },
            {
              data: {
                text: 'Но теперь у него все будет хорошо'
              },
              id: "G3zXIq6VNs",
              type: "paragraph"
            },
            {
              data: {
                text: 'В нашей семье <b><i><u class="cdx-underline">никог…b><i><u class="cdx-underline">никогда</u></i></b>'
              },
              id: "N6Gm4oKm9X",
              type: "paragraph"
            }
          ]
        }
      },
      {
        id: 4,
        editor: {
          time: 1707991122703,
          version: "2.29.0",
          blocks: [
            {
              data: {
                url: "https://foundpets.ru/v2/cloud/images/0:0:jpeg/2023/3/8/18/167829263954_1678299239_main-image.jpg.x0.jpeg",
                caption: "Счастливый Барсик&nbsp;❤",
                withBorder: false,
                withBackground: false,
                stretched: false
              },
              id: "vDmVqw9DH",
              type: "image"
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
