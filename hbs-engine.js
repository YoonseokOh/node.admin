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
hbs.registerPartials(__dirname + '/views/components/module');

// HTML save
hbs.registerHelper('extend', function(type, name, context) {
  if (!blocks[type]) {
    blocks[type] = {};
  }

  const block = blocks[type];

  if (!block.scriptArray) {
    block.scriptArray = [];
  }

  if (!block[name]) {
    block[name] = true;
    block.scriptArray.push(context.fn(this));
  } else {
    if (cfg.debug.hbs) {
      console.log('\n\n[HBS extend] unexpected');
      console.log(type);
      console.log(name);
      console.log(context.fn(this));
    }
  }
});

// HTML insert
hbs.registerHelper('block', function(type) {
  const val = ((blocks[type] && blocks[type].scriptArray) || []).join('\n');
  blocks[type] = {};
  return val;
});
