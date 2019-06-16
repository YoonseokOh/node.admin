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

const _ = require('lodash');
const express = require('express');
const router = express.Router();

// Default
router.get('/', (req, res) => {
  res.redirect('/home/index');
});

// Default
router.get('/*', (req, res, next) => {
  const routeArray = req._parsedUrl.path.substring(1)? req._parsedUrl.path.substring(1).split('/') : [];

  let routePath = _.cloneDeep(routesList);
  let layout = false;
  let path = '';
  routeArray.forEach(item => {
    if (!layout && item && routePath[item]) {
      if (routePath[item]) {
        path += path? `/${item}` : item;
        if (_.isString(routePath[item])) {
          layout = routePath[item];
        } else {
          routePath = routePath[item];
        }
      }
    }
  });

  if (cfg.debug.route) {
    console.log('\n\n[route] routeArray / layout / origin path / path');
    console.log(routeArray);
    console.log(layout);
    console.log(req._parsedUrl.path.substring(1));
    console.log(path);
  }

  if (layout && path) {
    res.render(path, {
      layout: layout,
      service: cfg.service
    });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
