const express = require('express');
const router = require('./api/scrapingAmazon');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(router);

const port = 3001;
app.listen(port, () => { console.log(`API RESTfull running on http://localhost:${port}`) });