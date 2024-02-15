export interface RowDataText {
    text: string
}

export interface RowDataImage {
    caption: string,
    stretched: boolean,
    url: string,
    withBackground: string,
    withBorder: boolean
}

export interface EditorRow {
    data: RowDataText | RowDataImage,
    id: string,
    type: string
}

export interface Editor {
    time: number,
    blocks: EditorRow[],
    version: string
}