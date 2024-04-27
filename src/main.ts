import * as vscode from "vscode";
import { window } from "vscode";
import { findDef } from "./funvistor"; // 假设 findDef 函数已在 funvistor.ts 中定义
import { getRange } from "./markdownparser";

const NEW_LINE = "\n";
const OutputChannel = vscode.window.createOutputChannel(
  "Python Function Deleter"
);

// 定义一个类型，用于描述对选中文本执行的操作
type ActionHandler = (
  selectedText: string,
  codelines: string,
  startPosition: vscode.Position,
  endPosition: vscode.Position
) => void;

function showInfo(msg: string) {
  // vscode.window.showInformationMessage(msg);
  OutputChannel.appendLine(msg);
}
// 辅助函数：处理选中的函数文本
function handleFunctionSelection(
  editor: vscode.TextEditor | undefined,
  action: ActionHandler,
  lantype: string = "python"
) {
  if (!editor) return;

  const selection = editor.selection;
  if (selection.isEmpty) {
    showInfo("No text selected.");
    return;
  }

  const selectedName = editor.document.getText(selection);
  const code = editor.document.getText();
  let result = { start: -1, end: -1 };
  if (lantype == "python") {
    result = findDef(code, selectedName, selection.start.line + 1);
  }
  if (lantype == "markdown") {
    result = getRange(code, selectedName);
  }

  if (result.end !== -1) {
    const startPosition = new vscode.Position(result.start - 1, 0);
    const endPosition = new vscode.Position(result.end - 1, 0);

    let codelines = editor.document.getText(
      new vscode.Range(startPosition, endPosition)
    );
    action(selectedName, codelines, startPosition, endPosition);
  } else {
    showInfo("Definition not found for the selected function.");
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
        showInfo("codelines copied to clipboard."),
      (error) => showInfo(`Failed to copy text: ${error}`)
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
  let markdownEditors: vscode.TextEditor[] = [];
  // 获取所有 markdown 编辑器
  for (const editor of visibleEditors) {
    if (editor.document.fileName.endsWith(".md")) {
      markdownEditors.push(editor);
    }
  }
  if (markdownEditors.length !== 2) {
    showInfo("Please open two markdown files.");
    return;
  }

  const [leftEditor, rightEditor] = markdownEditors;
  let cursorPosition = leftEditor.selection.active;
  
  cursorPosition = cursorPosition.with(cursorPosition.line, 0)

  const lineText = leftEditor.document.lineAt(cursorPosition.line).text;
  showInfo(`Moving line: ${lineText}`)
  showInfo('cursorPosition: ' + cursorPosition.line + ' ' + cursorPosition.character)

  leftEditor.edit((editBuilder) => {
    editBuilder.delete(
      new vscode.Range(
        cursorPosition,
        cursorPosition.translate(0, lineText.length)
      )
    );
  });

  // 在右侧编辑器插入当前行
  cursorPosition = rightEditor.selection.active;
  cursorPosition = cursorPosition.with(cursorPosition.line, 0);
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

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.markdowndeleter", () => {
      handleFunctionSelection(
        window.activeTextEditor,
        deleteAction,
        "markdown"
      );
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
