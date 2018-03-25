/*
 * Function : smartWizard.js
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
window.admin.smartWizard = (function () {
  /* SMART WIZARD */
  function init_SmartWizard() {
    if (typeof ($.fn.smartWizard) === 'undefined') {
      return;
    }

    console.log('init_SmartWizard');

    $('#wizard').smartWizard();

    $('#wizard_verticle').smartWizard({
      transitionEffect: 'slide'
    });

    $('.buttonNext').addClass('btn btn-success');

    $('.buttonPrevious').addClass('btn btn-primary');

    $('.buttonFinish').addClass('btn btn-default');
  }

  return {
    init_SmartWizard: init_SmartWizard
  }
})();

$(document).ready(function() {
  admin.smartWizard.init_SmartWizard();
});
