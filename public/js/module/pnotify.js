/*
 * Function : pnotify.js
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
window.admin.pnotify = (function () {
  /* PNotify */
  function init_PNotify() {
    if (typeof (PNotify) === 'undefined') {
      return;
    }

    console.log('init_PNotify');

    new PNotify({
      title: "PNotify",
      type: "info",
      text: "Welcome. Try hovering over me. You can click things behind me, because I'm non-blocking.",
      nonblock: {
        nonblock: true
      },
      addclass: 'dark',
      styling: 'bootstrap3',
      hide: false,
      before_close: function(PNotify) {
        PNotify.update({
          title: PNotify.options.title + " - Enjoy your Stay",
          before_close: null
        });

        PNotify.queueRemove();

        return false;
      }
    });
  }

  return {
    init_PNotify: init_PNotify
  }
})();

$(document).ready(function() {
  admin.pnotify.init_PNotify();
});
