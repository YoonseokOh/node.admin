/*
 * Function : hbsCustomized.js
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

const hbs = require('handlebars');

const blocks = {};

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
    if (cfg.debug.scriptlibrary) {
      if (type === 'scriptlibrary') {
        console.log('\n\n[HBS extend] scriptlibrary');
        console.log(type);
        console.log(name);
      }
    }

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
