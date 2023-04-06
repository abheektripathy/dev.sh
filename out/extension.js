"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    // Create a new webview panel
    const panel = vscode.window.createWebviewPanel('webviewPanel', 'My Webview Panel', vscode.ViewColumn.Beside, {
        enableScripts: true,
        retainContextWhenHidden: true,
    });
    // Set the HTML content for the panel
    panel.webview.html = '<h1>Hello, World!</h1>';
    // Add the panel to the sidebar
    context.subscriptions.push(panel);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map