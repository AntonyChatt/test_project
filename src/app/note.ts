import { Editor } from "./editor";

export interface Note {
    id: number,
    editor: Editor
  }

export interface NotePreview {
  id: number,
  text: string[],
  image: string,
  date: Date
}