const express = require('express');
const bodyparser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(bodyparser.json());
app.use(routes);

app.listen(3000);