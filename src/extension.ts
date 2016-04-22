'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when extension is activated.
// The extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "calc" was loaded');

    var calculator = new Caclulator();

    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.calculate', () => {
        let editor = vscode.window.activeTextEditor;
        calculator.calculateAt(editor, editor.selection.anchor);
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

export class Caclulator {
    private mathExpressionRegex = new RegExp('[0-9,\\+\\-\\*\\/\\^\\.\\(\\)]{1,}');
    
    public calculateAt(editor: vscode.TextEditor, pos: vscode.Position) : Thenable<boolean> {       
        
        // Get the line at the cursor
        let text = editor.document.lineAt(pos).text;
        
        var insertText = '=';
        
        // Test if the text at the cursor is a math expression                
        if(this.mathExpressionRegex.test(text)) {
            try {
                var insertText = insertText + eval(text).toString();
            } catch (error) {
                // eval failed, ignore                
            }
        }
        
        // Insert the result, or just the "=" symbol, since it was swallowed by the key binding
        return editor.edit(edit => {
            edit.insert(pos, insertText); 
        })                 
    }
}