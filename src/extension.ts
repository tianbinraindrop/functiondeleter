import * as vscode from "vscode";
import { Uri, commands, window } from "vscode";
import { findDef } from "./funvistor";
import { getEdiors} from "./tools
import { get } from "http";

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
      // vscode.window.showInformationMessage('Hello World from pythonfunctiondeleter!');
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
  let disposable_move2right = vscode.commands.registerCommand(
    "file.moveCurrentLineToLeftEditor",
    () => {
      let editors = getEdiors();
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(disposable_dup);
  context.subscriptions.push(disposable_move2right);
}

// This method is called when your extension is deactivated
export function deactivate() {}
