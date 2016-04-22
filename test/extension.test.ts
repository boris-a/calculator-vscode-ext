//
// Note: This test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as calcExtension from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Calculator Extension Tests", () => {    
    test("Calculate math expression result", () => {
        var caclulator = new calcExtension.Caclulator();
        var editor = vscode.window.activeTextEditor;
        var zeroPos = new vscode.Position(0,0);
        var mathExpression = "2+2";
        // Add math expression to the document
        editor.edit(edit => {
            edit.insert(zeroPos, mathExpression); 
        }).then(() => {
            // Perform calculation for the expression and make sure the result is now part of the document  
            caclulator.calculateAt(editor, new vscode.Position(0,mathExpression.length)).then(() => {
                let text = editor.document.lineAt(zeroPos).text;
                assert.equal(text, "2+2=4");
            });
        });                 
    });
});