function activate(context){
    var thisProvider={
        resolveWebviewView:function(thisWebview, thisWebviewContext, thisToken){
            thisWebviewView.webview.options={enableScripts:true}
            thisWebviewView.webview.html="<!doctype><html>[etc etc]";
        }
    };
    context.subscriptions.push(
        vscode.commands.registerWebviewViewProvider("calicoColors.colorView", thisProvider)
    );
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}