require('dotenv').config();
const express = require('express');
const enrouten = require('express-enrouten');
const expressValidator = require('express-validator');

require('./configs/database');

const app = express();
const port = process.env.PORT;

app.use(expressValidator());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/ping', (req, res) => res.status(200).json({ success: true, uptime: process.uptime() }));

app.use(enrouten({ directory: 'controllers' }));

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    code: 99,
    message: 'Internal Server Error',
    data: err.message,
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;
