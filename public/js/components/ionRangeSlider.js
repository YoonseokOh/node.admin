/*
 * Function : ionRangeSilder.js
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
window.admin.ionRangeSilder = (function () {
  /* ION RANGE SLIDER */
  function init_IonRangeSlider() {
    if (typeof ($.fn.ionRangeSlider) === 'undefined') {
      return;
    }

    console.log('init_IonRangeSlider');

    $("#range_27").ionRangeSlider({
      type: "double",
      min: 1000000,
      max: 2000000,
      grid: true,
      force_edges: true
    });

    $("#range").ionRangeSlider({
      hide_min_max: true,
      keyboard: true,
      min: 0,
      max: 5000,
      from: 1000,
      to: 4000,
      type: 'double',
      step: 1,
      prefix: "$",
      grid: true
    });

    $("#range_25").ionRangeSlider({
      type: "double",
      min: 1000000,
      max: 2000000,
      grid: true
    });

    $("#range_26").ionRangeSlider({
      type: "double",
      min: 0,
      max: 10000,
      step: 500,
      grid: true,
      grid_snap: true
    });

    $("#range_31").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 30,
      to: 70,
      from_fixed: true
    });

    $(".range_min_max").ionRangeSlider({
      type: "double",
      min: 0,
      max: 100,
      from: 30,
      to: 70,
      max_interval: 50
    });

    $(".range_time24").ionRangeSlider({
      min: +moment().subtract(12, "hours").format("X"),
      max: +moment().format("X"),
      from: +moment().subtract(6, "hours").format("X"),
      grid: true,
      force_edges: true,
      prettify: function(num) {
        var m = moment(num, "X");
        return m.format("Do MMMM, HH:mm");
      }
    });
  }

  return {
    init_IonRangeSlider: init_IonRangeSlider
  }
})();

$(document).ready(function() {
  admin.ionRangeSilder.init_IonRangeSlider();
});
