/*
 * Function : autosize.js
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
window.admin.autosize = (function () {
  /* AUTOSIZE */
  function init_autosize() {
    if (typeof $.fn.autosize !== 'undefined') {
      autosize($('.resizable_textarea'));
    }
  }

  return {
    init_autosize: init_autosize
  }
})();

$(document).ready(function() {
  admin.autosize.init_autosize();
});
