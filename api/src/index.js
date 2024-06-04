const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const route = require('./routes/index');
const db = require('./config/db');
const helmet = require('helmet');

require('dotenv').config();

db.connect().catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use(morgan('combined'));

route(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Port ' + PORT + ' is running'));
