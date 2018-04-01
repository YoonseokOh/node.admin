/*
 * Function : jVectorMap.js
 *
 * Description :
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

window.admin = window.admin || {};
window.admin.jVectorMap = (function () {
  function init_JQVmap(){
    //console.log('check init_JQVmap [' + typeof (VectorCanvas) + '][' + typeof (jQuery.fn.vectorMap) + ']' );
    if (typeof (jQuery.fn.vectorMap) === 'undefined') {
      return;
    }

    console.log('init_JQVmap');

    if ($('#world-map-gdp').length ){
      $('#world-map-gdp').vectorMap({
        map: 'world_mill_en',
        backgroundColor: null,
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        values: gdpData,
        scaleColors: ['#E6F2F0', '#149B7E'],
        normalizeFunction: 'polynomial'
      });
    }

    if ($('#usa_map').length ){
      $('#usa_map').vectorMap({
        map: 'usa_en',
        backgroundColor: null,
        color: '#ffffff',
        hoverOpacity: 0.7,
        selectedColor: '#666666',
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#E6F2F0', '#149B7E'],
        normalizeFunction: 'polynomial'
      });
    }
  }

  return {
    init_JQVmap: init_JQVmap
  }
})();

$(document).ready(function() {
  admin.jVectorMap.init_JQVmap();
});
