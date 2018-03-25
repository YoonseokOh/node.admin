/*
 * Function : iCheck.js
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
window.admin.iCheck = (function () {
  // iCheck
  function init_iCheck() {
    $(document).ready(function() {
      if ($("input.flat")[0]) {
        $(document).ready(function () {
          $('input.flat').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
          });
        });
      }
    });
  }

  return {
    init_iCheck: init_iCheck
  }
})();

$(document).ready(function() {
  admin.iCheck.init_iCheck();
});
