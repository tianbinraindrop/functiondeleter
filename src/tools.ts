import { workspace, window, ViewColumn, Uri, TextEditor, TextDocumentShowOptions, Range } from 'vscode';

export function getEdiors():Array<TextEditor> {
    const visibleEditors = window.visibleTextEditors;
    if (visibleEditors.length != 2) {
        return [];
    }

    let lefteditor:any = visibleEditors[0];
    let righteditor:any = visibleEditors[1];
    return [lefteditor, righteditor];
}