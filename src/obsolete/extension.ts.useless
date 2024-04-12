import * as vscode from "vscode";
import { window } from "vscode";
import { findDef } from "./funvistor";
import { TextEditor } from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.pythonfunctiondeleter",
    () => {
      const editor = window.activeTextEditor;
      if (editor) {
        let selection = editor.selection;

        let name = editor.document.getText(selection);
        let startline = selection.start.line + 1;

        let codeall = editor.document.getText();
        let result = findDef(codeall, name, startline);
        console.log("name", name, "startline", startline, "result", result);
        if (result.end != -1) {
          console.log("deleting lines", result.start, result.end);
          let startPos = new vscode.Position(result.start - 1, 0);
          let endPos = new vscode.Position(result.end - 1, 0);
          editor.edit((edit) => {
            edit.delete(new vscode.Range(startPos, endPos));
          });
        }
      }
    }
  );

  let disposable_dup = vscode.commands.registerCommand(
    "extension.pythonfunctionduplicate",
    () => {
      const editor = window.activeTextEditor;
      if (editor) {
        let selection = editor.selection;

        let name = editor.document.getText(selection);
        let startline = selection.start.line + 1;

        let codeall = editor.document.getText();
        let result = findDef(codeall, name, startline);
        console.log("name", name, "startline", startline, "result", result);
        if (result.end != -1) {
          console.log("duplcating lines", result.start, result.end);
          let startPos = new vscode.Position(result.start - 1, 0);
          let endPos = new vscode.Position(result.end - 1, 0);
          let duptext = editor.document.getText(
            new vscode.Range(startPos, endPos)
          );
          editor.edit((edit) => {
            edit.insert(startPos, "\n" + duptext + "\n");
          });
        }
      }
    }
  );

  // 实现将当前行的函数移动到右边的编辑器的功能
  // 命令必须小写，否则出现各种问题
  let disposable_move2right = vscode.commands.registerCommand(
    "extension.movecurrentlinetorighteditor",
    () => {
      
      const visibleEditors = window.visibleTextEditors;
      if (visibleEditors.length != 2) {
        console.log("need 2 editors");
      } else {
        const lefteditor = visibleEditors[0];
        const righteditor = visibleEditors[1];
        
        let cursorPosition = lefteditor.selection.active;
        let line = lefteditor.document.lineAt(cursorPosition.line);
        let endpos = new vscode.Position(cursorPosition.line, line.text.length);
        let startpos = new vscode.Position(cursorPosition.line, 0);
        const text = line.text;
        
        lefteditor.edit((edit) => {
            edit.delete(new vscode.Range(startpos, endpos));
          });
          
        cursorPosition = righteditor.selection.active;
        line = righteditor.document.lineAt(cursorPosition.line);
        startpos = new vscode.Position(cursorPosition.line, 0);
        righteditor.edit((edit) => {
            edit.insert(startpos, "\n" + text + "\n");
          });
      }
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable_dup);
  context.subscriptions.push(disposable_move2right);
}

// This method is called when your extension is deactivated
export function deactivate() {}
