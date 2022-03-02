/*
 * Function : app.js
 *
 * Description : start up
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

"use strict";

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('./app/views/hbsCustomized'); // Do not remove

require('./app/globals/constants');

// Middle-ware
const compression = require('compression');
const minify = require('express-minify');

app.disable('x-powered-by');

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

// Set view engine ( hbs : handlebars )
app.set('trust proxy', 'loopback');
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'app/views/layout'),
  partialsDir: path.join(__dirname, 'app/views/components'),
}));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/app/views');

if (cfg.env === 'production') {
  app.use(compression());
  app.use(minify());
}

// Set pre route
require('./app/routes/preRoute')(app);

// Set routes
app.use('/', require('./app/routes'));

// Set post route
require('./app/routes/postRoute')(app);

module.exports = app;
