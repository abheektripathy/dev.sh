const express = require("express");
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
	apiKey: "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",
  });

const openai = new OpenAIApi(configuration);
const app = express();

// define a route handler for the default home page

app.post('/codeit/', (req, res) => {

	return req;
});

// start the express server
app.listen(3000, () => {
	console.log('server started at http://localhost:3000');
});
