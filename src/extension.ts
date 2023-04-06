import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Create a new webview panel
	const panel = vscode.window.createWebviewPanel(
	  'webviewPanel',
	  'My Webview Panel',
	  vscode.ViewColumn.Beside,
	  {
		enableScripts: true,
		retainContextWhenHidden: true,
	  }
	);
  
	// Set the HTML content for the panel
	panel.webview.html = '<h1>Hello, World!</h1>';
  
	// Add the panel to the sidebar
	context.subscriptions.push(panel);
  }

export function deactivate() {}
