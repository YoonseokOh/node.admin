/*
 * Function : post-route.js
 *
 * Description :
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

"use strict";

module.exports = function(express) {
  express.use(function(err, req, res, next) {
    console.log('\n\n[POST-ROUTE] error');
    console.log(err);
  })
};
