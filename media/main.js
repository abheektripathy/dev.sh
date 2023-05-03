// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

const vscode = acquireVsCodeApi();

const oldState = vscode.getState() || {
	prompt: '',
};

let prompt = oldState.prompt;

let input = document.getElementById("inputEN");
let resultArea = document.getElementById("resultArea");
let apiKey = document.getElementById("inputAPIKey");


document.getElementById('submitAPIKey').addEventListener('click', ()=> {
	vscode.postMessage({ type: 'setAPIKey', value: apiKey.value });
	console.log('button clicked: ', apiKey.value);
});

document.getElementById('codeItButton').addEventListener('click', () => {
    vscode.postMessage({ type: 'codeIt', value: input.value });
	console.log('button clicked: ', input.value);
});

document.getElementById('explainButton').addEventListener('click', () => {
	// commentCode();

    vscode.postMessage({ type: 'explainCode'});
	console.log('explain button clicked: ');
});

window.addEventListener('message', (event) => {
	const message = event.data; // The json data that the extension sent

    switch (message.type) {
        case 'codeItResp': {
            resultArea.value = message.value;
        }
    }
});



/**
 * @param {string} color
 */

async function commentCode() {
	vscode.postMessage({ type: 'colorSelected', value: 'retard ban ja' });
}
