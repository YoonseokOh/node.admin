/*
 * Function : inputmask.js
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
window.admin.inputmask = (function () {
  /* INPUT MASK */
  function init_InputMask() {
    if( typeof ($.fn.inputmask) === 'undefined'){ return; }
    console.log('init_InputMask');

    $(":input").inputmask();
  }

  return {
    init_InputMask: init_InputMask
  }
})();

$(document).ready(function() {
  admin.inputmask.init_InputMask();
});
