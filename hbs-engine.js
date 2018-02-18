/*
 * Function : hbs-engine.js
 *
 * Description : helper function of handle bar
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under yoonseok oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

"use strict";

const hbs = require('hbs');

const blocks = {};

hbs.registerPartials(__dirname + '/views/components');

hbs.registerHelper('extend', function(name, context) {
  let block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this));
});

hbs.registerHelper('block', function(name) {
  const val = (blocks[name] || []).join('\n');
  blocks[name] = [];
  return val;
});
