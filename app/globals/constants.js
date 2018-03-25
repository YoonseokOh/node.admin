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

const layoutType = {
  default: 'layout/default',
  simple: 'layout/simple',
  nothing: 'layout/nothing'
};

global.routesList = {
  additional: {
    contacts: layoutType.default,
    ecommerce: layoutType.default,
    profile: layoutType.default,
    projectDetail: layoutType.default,
    projects: layoutType.default
  },
  chart: {
    echarts: layoutType.default,
    js: layoutType.default,
    js2: layoutType.default,
    morisjs: layoutType.default,
    others: layoutType.default
  },
  form: {
    advanced: layoutType.default,
    buttons: layoutType.default,
    general: layoutType.default,
    upload: layoutType.default,
    validation: layoutType.default,
    wizards: layoutType.default
  },
  home: {
    index: layoutType.default,
    index2: layoutType.default,
    index3: layoutType.default,
    level2: layoutType.default
  },
  table: {
    dynamic: layoutType.default,
    general: layoutType.default
  },
  ui: {
    calendar: layoutType.default,
    general: layoutType.default,
    glyphicons: layoutType.default,
    icons: layoutType.default,
    inbox: layoutType.default,
    invoice: layoutType.default,
    mediaGallery: layoutType.default,
    typography: layoutType.default,
    widgets: layoutType.default
  },
  extras: {
    login: layoutType.simple,
    plain: layoutType.default,
    pricingTables: layoutType.simple
  },
  '403': layoutType.simple,
  '404': layoutType.simple,
  '500': layoutType.simple,
  login: layoutType.simple
};
