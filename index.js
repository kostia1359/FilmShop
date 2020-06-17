const {port, key} = require('./server/env').app;

const express = require('express')
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    store: new MongoStore({url: 'mongodb://localhost:27017/sessionBD'}),
    resave: true,
    rolling: true,
    saveUninitialized: false,
    secret: key,
    cookie: {
        maxAge: 60 * 60 * 24,

    }
}));

const configurePassport=require('./server/configurePassport').configuration;
configurePassport(app);

const routes = require('./server/api/routes/index');
routes(app);


app.get('/', function (req, res) {
    res.send('Hello ' + JSON.stringify(req.session));
});
app.use('/content', express.static('./client'));


app.listen(port, () => {
});

exports.app = app;