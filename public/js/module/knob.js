/*
 * Function : knob.js
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
window.admin.knob = (function () {
  /* KNOB */
  function init_knob() {
    if (typeof ($.fn.knob) === 'undefined') {
      return;
    }

    console.log('init_knob');

    $(".knob").knob({
      change: function(value) {
        //console.log("change : " + value);
      },

      release: function(value) {
        //console.log(this.$.attr('value'));
        console.log("release : " + value);
      },

      cancel: function() {
        console.log("cancel : ", this);
      },

      /*
      format : function (value) {
        return value + '%';
      },
      */

      draw: function() {
        // "tron" case
        if (this.$.data('skin') == 'tron') {
          this.cursorExt = 0.3;

          var a = this.arc(this.cv); // Arc
          var pa; // Previous arc
          var r = 1;

          this.g.lineWidth = this.lineWidth;

          if (this.o.displayPrevious) {
            pa = this.arc(this.v);
            this.g.beginPath();
            this.g.strokeStyle = this.pColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
            this.g.stroke();
          }

          this.g.beginPath();
          this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
          this.g.stroke();

          this.g.lineWidth = 2;
          this.g.beginPath();
          this.g.strokeStyle = this.o.fgColor;
          this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
          this.g.stroke();

          return false;
        }
      }
    });

    // Example of infinite knob, iPod click wheel
    var v;
    var up = 0;
    var down = 0;
    var i = 0;
    var $idir = $("div.idir");
    var $ival = $("div.ival");

    var incr = function() {
      i++;
      $idir.show().html("+").fadeOut();
      $ival.html(i);
    };

    var decr = function() {
      i--;
      $idir.show().html("-").fadeOut();
      $ival.html(i);
    };

    $("input.infinite").knob({
      min: 0,
      max: 20,
      stopper: false,
      change: function() {
        if (v > this.cv) {
          if (up) {
            decr();
            up = 0;
          } else {
            up = 1;
            down = 0;
          }
        } else {
          if (v < this.cv) {
            if (down) {
              incr();
              down = 0;
            } else {
              down = 1;
              up = 0;
            }
          }
        }
        v = this.cv;
      }
    });
  }

  return {
    init_knob: init_knob
  }
})();

$(document).ready(function() {
  admin.knob.init_knob();
});
