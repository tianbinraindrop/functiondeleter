import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';
//
import * as parser from '../markdownparser';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  test("Sample test", () => {
	// assert.equal('Document',parser.parseMarkdownToAST("# Hello World"));
	// assert.equal('Doc',parser.parseMarkdownToAST("# Hello World"));
    assert.strictEqual(2, 2);
  });
});
