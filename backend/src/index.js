const express = require('express');
const router = require('./scrapeAPI');
const app = express();

app.use(express.json());
app.use(router);

const port = 3001;
app.listen(port, () => { console.log(`API RESTfull running on http://localhost:${port}`) });