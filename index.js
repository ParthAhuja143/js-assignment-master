const express = require('express');
const {json} = require('body-parser')
const helper = require("./src/lib/helper");
const config = require('./config/config');
const port = config.server.port;

const app = express();

// Parse incoming requests data
app.use(json());

//Register routes
helper
    .fileList('./src/routes')
    .forEach(filePath => require(`./${filePath.toString()}`)(app));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {
  app: app
}