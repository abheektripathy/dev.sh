try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}
import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "constant";
import { LeftPanelWebview } from "providers/left-webview-provider";
import * as openai from 'openai';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.explainCodeSnippet', async() => {


		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			const selectedText= editor.document.getText(editor.selection);
			const res= await explainCode(selectedText);
		}
		else{
			vscode.window.showInformationMessage('No text selected');
			const res = "no text";
		}
		});
		const res = "no text";
		context.subscriptions.push(disposable);
	

	// Register view
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, res);
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

};
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
	vscode.window.showInformationMessage(`${output}`); }

// this method is called when your extension is deactivated
export function deactivate() {}
