"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const vscode = require("vscode");
const openai_1 = require("openai");
const dotenv = require("dotenv");
dotenv.config();
function activate(context) {
    console.log('Congratulations, your extension "devsh" is now active!');
    let disposable = vscode.commands.registerCommand('extension.explainCodeSnippet', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selectedText = editor.document.getText(editor.selection);
            await explainCode(selectedText);
        }
        else {
            vscode.window.showInformationMessage('No text selected');
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
async function explainCode(code) {
    const apikey = "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";
    if (!apikey) {
        throw new Error('OpenAI API key not found');
    }
    const config = new openai_1.Configuration({
        apiKey: apikey
    });
    const openai = new openai_1.OpenAIApi(config);
    const prompt = `explain the ${code} in plain text english`;
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0.4,
        max_tokens: 250,
    });
    const output = response.data.choices[0].text;
    vscode.window.showInformationMessage(`${output}`);
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map