/*
 * Function : colorpicker.js
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
window.admin.colorpicker = (function () {
  /* COLOR PICKER */
  function init_ColorPicker() {
    if (typeof ($.fn.colorpicker) === 'undefined') {
      return;
    }

    console.log('init_ColorPicker');

    $('.demo1').colorpicker();

    $('.demo2').colorpicker();

    $('#demo_forceformat').colorpicker({
      format: 'rgba',
      horizontal: true
    });

    $('#demo_forceformat3').colorpicker({
      format: 'rgba',
    });

    $('.demo-auto').colorpicker();
  }

  return {
    init_ColorPicker: init_ColorPicker
  }
})();

$(document).ready(function() {
  admin.colorpicker.init_ColorPicker();
});
