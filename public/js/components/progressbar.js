/*
 * Function : progressbar.js
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
window.admin.progressbar = (function () {
  // Progressbar
  function init_progressbar() {
    if ($(".progress .progress-bar")[0]) {
      $('.progress .progress-bar').progressbar();
    }
  }

  return {
    init_progressbar: init_progressbar
  }
})();

$(document).ready(function() {
  admin.progressbar.init_progressbar();
});
