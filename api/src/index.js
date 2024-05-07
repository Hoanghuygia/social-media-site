const express = require('express');
const morgan = require('morgan');

const route = require('./routes');
const db = require('./config/db');

require('dotenv').config();

db.connect();

const app = express();
app.use(express.json());

app.use(morgan('combined'));

route(app);

const PORT = process.env.PORT;
// const PORT = 3000;
app.listen(PORT, () => console.log('Port ' + PORT + ' is running'));
