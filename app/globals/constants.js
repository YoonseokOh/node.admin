/*
 * Function : constants.js
 *
 * Description :
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

const _ = require('lodash');
const config = require('config');

global.cfgOrigin = config.get('cfg');
global.cfg = _.cloneDeep(cfgOrigin);
