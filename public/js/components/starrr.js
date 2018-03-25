/*
 * Function : starrr.js
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
window.admin.starrr = (function () {
  /* STARRR */
  function init_starrr() {
    if (typeof (starrr) === 'undefined') {
      return;
    }

    console.log('init_starrr');

    $(".stars").starrr();

    $('.stars-existing').starrr({
      rating: 4
    });

    $('.stars').on('starrr:change', function (e, value) {
      $('.stars-count').html(value);
    });

    $('.stars-existing').on('starrr:change', function (e, value) {
      $('.stars-count-existing').html(value);
    });
  };

  return {
    init_starrr: init_starrr
  }
})();


$(document).ready(function() {
  admin.starrr.init_starrr();
});
