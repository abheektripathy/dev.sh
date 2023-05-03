import * as vscode from 'vscode';
import axios from "axios";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import * as openai from 'openai';
dotenv.config();

export function activate(context: vscode.ExtensionContext) {

	const provider = new WebViewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(WebViewProvider.viewType, provider));
}
//basically add open ai api or setup a express server, to do it for you.
async function fetchCodeByPrompt(prompt: string, key: string) {
	
	const apikey = key;
	if(!apikey){
		vscode.window.showInformationMessage('No api key');
		throw new Error('OpenAI API key not found');
	}
	
		const config = new Configuration({
			apiKey: apikey
		});

	const openai = new OpenAIApi(config);
	const code = `just give only code for this question, only code no english, neither at the start nor at the end, just code, here's the question- ${prompt}`;
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${code}`,
		temperature: 0.4,
		max_tokens: 250,
	});
	
	const output = response.data.choices[0].text;
	return output;
}

async function explainCode(selectedText: string , key: string) {
	const apikey = key;
	if(!apikey){
		vscode.window.showInformationMessage('no Api key');
		throw new Error('OpenAI API key not found');
	}
	
		const config = new Configuration({
			apiKey: apikey
		});

	const openai = new OpenAIApi(config);
	const prompt = `Explain this code in english in 2 lines max ${selectedText}`;
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: `${prompt}`,
		temperature: 0.4,
		max_tokens: 250,
	});
	
	const output = response.data.choices[0].text;
	return output;
}

class WebViewProvider implements vscode.WebviewViewProvider {

	public static readonly viewType = 'devsh.main';

	private _view?: vscode.WebviewView;
	private apiKey?: string;

	constructor(
		private readonly _extensionUri: vscode.Uri,
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			// Allow scripts in the webview
			enableScripts: true,

			localResourceRoots: [
				this._extensionUri
			]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		webviewView.webview.onDidReceiveMessage(data => {
			switch (data.type) {
				case 'setAPIKey' :
					{
						if(data.value) {this.apiKey = data.value;
						console.log(this.apiKey,"jadhcja");}
						else {
							console.log("add something mf");
						}
						break;
					}
				case 'codeIt':
					{
						fetchCodeByPrompt(data.value, this.apiKey!).then(code => {
							webviewView.webview.postMessage({
								type: 'codeItResp',
								value: code
							});
						});
						break;
					}
				case 'explainCode':
					{
						const editor = vscode.window.activeTextEditor;
						if(editor) {
							const selectedText= editor.document.getText(editor.selection);
							console.log(selectedText, "selectedtexttt");

							explainCode(selectedText, this.apiKey!).then(explainedcode => {
								vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${explainedcode}\n${selectedText} `));
							});
						}
						else{
							vscode.window.showInformationMessage('No editor active');
							
						}
						break;
					}			
			}
		});
	}
	


//selected text utha 


	private _getHtmlForWebview(webview: vscode.Webview) {
		// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
		const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js'));
		// Do the same for the stylesheet.
		const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
		const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
		const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

		// Use a nonce to only allow a specific script to be run.
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<link href="${styleMainUri}" rel="stylesheet">

				<title>dev.sh</title>
			</head>
			<body>
				<div class="panel-wrapper"> 
    <br>
    <span class="panel-info">
        Streamline your Developer Workflows.
    </span>
    <br>
    <div class="input-box">
        <label for="inputEN">What's on your mind?</label>
        <br>
        <input type="text" id="inputEN" value="" placeholder="how to deploy to dockerhub? " class="input-field">
    </div>
    <br>
    <span class="flex-row">
        <button class="button" id="codeItButton">code it</button>
        <button class="button" id="explainButton">explain</button>
    </span>
    <br>
    <div class="input-box-a">
        <label for="inputEN">Here's your code</label>
        <br>
        <textarea id="resultArea" value="" placeholder="
            steps:
            - name: Checkout code
              uses: actions/checkout@v2
            - name: Login to DockerHub
              uses: docker/login-action@v1
              with:
                username: \${{ secrets.DOCKER_USERNAME }}
                password: \${{ secrets.DOCKER_PASSWORD }}
            - name: Build and push Docker image
              uses: docker/build-push-action@v2
              with:
                push: true
                tags: username/repo:latest
         " class="input-field-a"></textarea>
    </div>
	<br/>
	<span class="flex-row">
	<div class="input-box">
	<input type="text" id="inputAPIKey" value="" placeholder="Add your API key" class="input-field">
</div>
	<button class="buttonapi" id="submitAPIKey">Add</button>
</span>
</div>


				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}


