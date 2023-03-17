## Functionalities.

An intelligent code explainer powered by the GPT-3 model. This feature allows developers to select a block of code and request an explanation in plain English. 

A search bar that converts user inputs in plain English to Git and Docker commands. Avoid the hassle of memorizing Git and Docker commands.

Provides GitHub Actions file templates that allow developers to automate their workflows. Customize them to fit their specifc needs.


## Requirements

There are 4 things you require: 

* NodeJS

* yeoman

* vs code generator

* OpenAI API key



## Setting up the extension 

Run the following commands: 

* `npm install -g yo generator-code`


* `yo code`

## Testing the default extension setup


Now, to test your extension press f5 or simoly click on the bufg button in the left panel of VSCode and click on "Run and Debug". 

Press `Ctrl+Shift+P` on Windows or Linux / `Cmd+Shift+P` on MacOS to open command pallett, run hello world, it's working.


## OpenAI Integration in extension.ts

Include the following lines of code: 

* Make an editor : 


`const editor = vscode.window.activeTextEditor;`


* To select the highlighted code:


`const selectedText= editor.document.getText(editor.selection);`

 await explainCode(selectedText);`


* After setting up the editor for selection, it's time to get your API key from [OpenAI](https://platform.openai.com/). An store it in the `.env` file as : `OPENAI_AI_APIKEY={your API key}` .

* `npm install openai`

* Import it as `import { Configuration, OpenAIApi } from "openai";`

Configure your apikey: 
`const configuration = new Configuration({
				apiKey: OPENAI_API_KEY,
			});`

This is the response const that stores the model-name, prompt, temperature, max_tokens of the OpenAI-model you are using in the extension.

`const response = await openai.createCompletion({

  model: "text-davinci-003",
  
	prompt: `${prompt}`,
  
	temperature: 0.4,
  
	max_tokens: 250;
  
	});`
  
 We can get the ouput in the variable 
`response.data.choices[0].text`.


## Package.json

Update your package.json by adding 

`"commands": [
            {
                "command": "Your command",
                "title": "Your command title"
            }`
            
            
 inside the `contributes` tag.
## Releases

### v0.1
Fixes issue #1

Implements the #1 feature - Explain Code Snippet using GPT-3 Model.

---


And it's done, your vscode extension, a search bar for commands and Github Actions template are all set up - for developers!
