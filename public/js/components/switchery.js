/*
 * Function : switchery.js
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
window.admin.switchery = (function () {
  // Switchery
  function init_switchery() {
    if ($(".js-switch")[0]) {
      var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

      elems.forEach(function (html) {
        var switchery = new Switchery(html, {
          color: '#26B99A'
        });
      });
    }
  }

  return {
    init_switchery: init_switchery
  }
})();

$(document).ready(function() {
  admin.switchery.init_switchery();
});
