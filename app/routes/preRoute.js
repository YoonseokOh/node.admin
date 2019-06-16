/*
 * Function : pre-route.js
 *
 * Description :
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

module.exports = function(express) {
  if (cfg.env !== 'production') {
    express.use(function (req, res, next) {
      console.log(decodeURI(req.originalUrl));
      next();
    });
  }
};
