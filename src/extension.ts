import * as vscode from "vscode";
import { Uri, commands, window } from "vscode";
import { findDef } from "./funvistor";

function openFile(filename: string) {
  const uri = Uri.file(filename);
  let success = commands.executeCommand("vscode.open", uri);
  console.log("success", success);
}

function deletelines(start: number, end: number) {
  const editor = window.activeTextEditor;
  if (editor) {
    let startPos = new vscode.Position(start - 1, 0);
    let endPos = new vscode.Position(end - 1, 0);
    editor.edit((edit) => {
      edit.delete(new vscode.Range(startPos, endPos));
    });
  }
}

function getSelection(): { content: string; line: number } {
  const editor = window.activeTextEditor;
  if (editor) {
    const selection = editor.selection;
    const content = editor.document.getText(selection);
    return { content: content, line: selection.start.line + 1 };
  }
  return { content: "", line: -1 };
}

function getFunctionLines(
  name: string,
  startline: number
): { start: number; end: number } {
  const editor = window.activeTextEditor;
  if (editor) {
    const codeall = editor.document.getText();
    console.log(startline, name);
    let result = findDef(codeall, name, startline);
    console.log(name, result);
    return { start: result.start, end: result.end };
  }
  return { start: -1, end: -1 };
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.pythonfunctiondeleter",
    () => {
      // vscode.window.showInformationMessage('Hello World from pythonfunctiondeleter!');
      const editor = window.activeTextEditor;
      if (editor) {
        let selection = editor.selection;

        let name = editor.document.getText(selection);
        let startline = selection.start.line + 1;

        let codeall = editor.document.getText();
        console.log("name", name, "startline", startline);
        let result = findDef(codeall, name, startline);
        console.log("result", result);
        if (result.end != -1) {
          console.log("deleting lines", result.start, result.end);
          deletelines(result.start, result.end);
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
