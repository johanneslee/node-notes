const dotenv = require('dotenv');
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const wordsRouter = require('../routes/words');

dotenv.config();
const app = require('express')();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/words', wordsRouter);

module.exports = app;