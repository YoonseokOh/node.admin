/*
 * Function : select2.js
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
window.admin.select2 = (function () {
  /* SELECT2 */
  function init_select2() {
    if (typeof (select2) === 'undefined') {
      return;
    }

    console.log('init_toolbox');

    $(".select2_single").select2({
      placeholder: "Select a state",
      allowClear: true
    });

    $(".select2_group").select2({});

    $(".select2_multiple").select2({
      maximumSelectionLength: 4,
      placeholder: "With Max Selection limit 4",
      allowClear: true
    });
  }

  return {
    init_select2: init_select2
  }
})();

$(document).ready(function() {
  admin.select2.init_select2();
});
