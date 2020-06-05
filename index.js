const {port}=require('./server/env').app;

const express = require('express')
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./server/api/routes/index');
routes(app);

app.use('/tables', express.static('./client'));


app.listen(port, () => {});

exports.app = app;