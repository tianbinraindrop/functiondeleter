import * as vscode from "vscode";
import { window } from "vscode";
import { findDef } from "./funvistor"; // 假设 findDef 函数已在 funvistor.ts 中定义

const NEW_LINE = "\n";

// 定义一个类型，用于描述对选中文本执行的操作
type ActionHandler = (
  selectedText: string,
  codelines: string,
  startPosition: vscode.Position,
  endPosition: vscode.Position
) => void;

// 辅助函数：处理选中的函数文本
function handleFunctionSelection(
  editor: vscode.TextEditor | undefined,
  action: ActionHandler
) {
  if (!editor) return;

  const selection = editor.selection;
  if (selection.isEmpty) {
    vscode.window.showInformationMessage("No text selected.");
    return;
  }

  const selectedName = editor.document.getText(selection);
  const code = editor.document.getText();
  const result = findDef(code, selectedName, selection.start.line + 1);

  if (result.end !== -1) {
    const startPosition = new vscode.Position(result.start - 1, 0);
    const endPosition = new vscode.Position(result.end - 1, 0);

    let codelines = editor.document.getText(
      new vscode.Range(startPosition, endPosition)
    );
    action(selectedName, codelines, startPosition, endPosition);
  } else {
    vscode.window.showInformationMessage(
      "Definition not found for the selected function."
    );
  }
}

// 具体的删除操作函数
function deleteAction(
  selectedText: string,
  codelines: string,
  startPosition: vscode.Position,
  endPosition: vscode.Position
): void {
  const editor = window.activeTextEditor;
  if (editor) {
    editor.edit((editBuilder) => {
      editBuilder.delete(new vscode.Range(startPosition, endPosition));
    });

    //复制到剪贴板
    vscode.env.clipboard.writeText(codelines).then(
      () =>
        vscode.window.showInformationMessage("codelines copied to clipboard."),
      (error) => vscode.window.showErrorMessage(`Failed to copy text: ${error}`)
    );
  }
}

// 具体的复制操作函数
function duplicateAction(
  selectedText: string,
  codelines: string,
  startPosition: vscode.Position,
  endPosition: vscode.Position
): void {
  const editor = window.activeTextEditor;
  if (editor) {
    editor.edit((editBuilder) => {
      editBuilder.insert(startPosition, NEW_LINE + codelines + NEW_LINE); // 假设我们复制到当前编辑器的光标位置
    });
  }
}

// 辅助函数：将当前行移动到右侧编辑器
function moveCurrentLineToRightEditor() {
  const visibleEditors = vscode.window.visibleTextEditors;
  if (visibleEditors.length !== 2) {
    vscode.window.showInformationMessage(
      "Two editors must be open for this operation."
    );
    return;
  }

  const [leftEditor, rightEditor] = visibleEditors;
  const cursorPosition = leftEditor.selection.active;
  const lineText = leftEditor.document.lineAt(cursorPosition.line).text;

  leftEditor.edit((editBuilder) => {
    editBuilder.delete(
      new vscode.Range(
        cursorPosition,
        cursorPosition.translate(0, lineText.length)
      )
    );
  });

  rightEditor.edit((editBuilder) => {
    editBuilder.insert(cursorPosition, lineText + NEW_LINE);
  });
}

export function activate(context: vscode.ExtensionContext) {
  // 注册删除选中函数的命令
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.pythonfunctiondeleter", () => {
      handleFunctionSelection(window.activeTextEditor, deleteAction);
    })
  );

  // 注册复制选中函数的命令
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.pythonfunctionduplicate", () => {
      handleFunctionSelection(window.activeTextEditor, duplicateAction);
    })
  );

  // 其他命令和订阅...
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.movecurrentlinetorighteditor",
      () => {
        moveCurrentLineToRightEditor();
      }
    )
  );
}

export function deactivate() {}
