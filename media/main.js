// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.

const vscode = acquireVsCodeApi();

const oldState = vscode.getState() || {
	prompt: '',
};

let prompt = oldState.prompt;

let input = document.getElementById("inputEN");
let resultArea = document.getElementById("resultArea");

document.getElementById('codeItButton').addEventListener('click', () => {
	// commentCode();

    vscode.postMessage({ type: 'codeIt', value: input.value });

	console.log('button clicked: ', input.value);
});


document.getElementById('explainButton').addEventListener('click', () => {
	// commentCode();

    vscode.postMessage({ type: 'explainCode'});

	console.log('explain button clicked: ');
});
// Handle messages sent from the extension to the webview
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
