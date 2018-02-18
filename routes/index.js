/*
 * Function : index.js
 *
 * Description : main route
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

"use strict";

const express = require('express');
const router = express.Router();

// Test
router.get('/', (req, res) => {
  res.render('index.hbs');
});

// Login
router.get('/login', (req, res, next) => {
  if (cfg.mode.login) {
    res.render('login.hbs', {
      layout: 'layout/simple'
    });
  } else {
    next();
  }
});

// Default
router.get('/*', (req, res, next) => {
  res.render(req._parsedUrl.path.substring(1), {
    layout: 'layout/default',
    service: cfg.service
  });
});

module.exports = router;
