/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as openai from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "devsh" is now active!');
	let disposable = vscode.commands.registerCommand('extension.explainCodeSnippet', async() => {


	const editor = vscode.window.activeTextEditor;
	if(editor) {
		const selectedText= editor.document.getText(editor.selection);
		await explainCode(selectedText);
	}
	else{
		vscode.window.showInformationMessage('No text selected');
	}
	});

	context.subscriptions.push(disposable);
}

async function explainCode(code: string){
	const apikey = process.env.OPENAI_API_KEY;
	if(!apikey){
		throw new Error('OpenAI API key not found');
	}
	
		const config = new Configuration({
			apiKey: apikey
		});

	const openai = new OpenAIApi(config);
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
export function deactivate() {}
