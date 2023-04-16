'use strict'

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`))
  },
}