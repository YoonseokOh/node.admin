/*
 * Function : Skycons.js
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
window.admin.Skycons = (function () {
  function init_skycons(){
    if (typeof (Skycons) === 'undefined') {
      return;
    }

    console.log('init_skycons');

    var i;
    var icons = new Skycons({
        "color": "#73879C"
      });
    var list = [
        "clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"
      ];
    var i;

    for (i = list.length; i--;) {
      icons.set(list[i], list[i]);
    }

    icons.play();
  }


  return {
    init_skycons: init_skycons
  }
})();

$(document).ready(function() {
  admin.Skycons.init_skycons();
});
