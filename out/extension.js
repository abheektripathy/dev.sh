"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
function activate(context) {
    const provider = new WebViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(WebViewProvider.viewType, provider));
}
exports.activate = activate;
//basically add open ai api or setup a express server, to do it for you.
async function fetchCodeByPrompt(prompt) {
    return prompt + "terim mummy";
    const resp = await axios_1.default.post("http://localhost:3000/codeit", {
        prompt
    });
    return resp.data;
}
async function explainCode(selectedText) {
    console.log(selectedText, "rand");
    return selectedText;
}
class WebViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
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
                case 'codeIt':
                    {
                        fetchCodeByPrompt(data.value).then(code => {
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
                        if (editor) {
                            const selectedText = editor.document.getText(editor.selection);
                            console.log(selectedText, "selectedtexttt");
                            explainCode(selectedText).then(explainedcode => {
                                vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString(`#${explainedcode} /n #${explainedcode}`));
                            });
                        }
                        else {
                            vscode.window.showInformationMessage('No text selected');
                            const res = "no text";
                        }
                    }
            }
        });
    }
    //selected text utha 
    _getHtmlForWebview(webview) {
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
        Streamline your Developer Worflows.
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
    <!-- <div class="input-box">
        <pre>
            <textarea class="input-field" defaultValue="// Your code here"></textarea>
        </pre>
    </div> -->
</div>


				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
}
WebViewProvider.viewType = 'devsh.main';
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
//# sourceMappingURL=extension.js.map