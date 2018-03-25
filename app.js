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
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('./hbs-engine');

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
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

if (cfg.env === 'production') {
  app.use(compression());
  app.use(minify());
}

// Set pre route
require('./routes/pre-route')(app);

// Set routes
app.use('/', require('./routes'));

// Set post route
require('./routes/post-route')(app);

module.exports = app;
