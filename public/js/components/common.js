/**
 * Resize function without multiple trigger
 *
 * Usage:
 * $(window).smartresize(function(){
 *     // code here
 * });
 */
(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;

    return function debounced () {
      var obj = this, args = arguments;

      function delayed () {
        if (!execAsap) {
          func.apply(obj, args);
        }
        timeout = null;
      }

      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(obj, args);
      }

      timeout = setTimeout(delayed, threshold || 100);
    };
  };

  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');
/**
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var CURRENT_URL = window.location.href.split('#')[0].split('?')[0];
var $BODY = $('body');
var $MENU_TOGGLE = $('#menu_toggle');
var $SIDEBAR_MENU = $('#sidebar-menu');
var $SIDEBAR_FOOTER = $('.sidebar-footer');
var $LEFT_COL = $('.left_col');
var $RIGHT_COL = $('.right_col');
var $NAV_MENU = $('.nav_menu');
var $FOOTER = $('footer');
var common_debug = false;

// Sidebar
function init_sidebar() {
  // TODO: This is some kind of easy fix, maybe we can improve this
  var setContentHeight = function () {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());

    var bodyHeight = $BODY.outerHeight();
    var footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height();
    var leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height();
    var contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;

    $RIGHT_COL.css('min-height', contentHeight);
  };

  $SIDEBAR_MENU.find('a').on('click', function(ev) {
    if (common_debug) {
      console.log('clicked - sidebar_menu');
    }

    var $li = $(this).parent();

    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function() {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $SIDEBAR_MENU.find('li').removeClass('active active-sm');
        $SIDEBAR_MENU.find('li ul').slideUp();
      } else {
        if ($BODY.is( ".nav-sm" )) {
          $SIDEBAR_MENU.find( "li" ).removeClass( "active active-sm" );
          $SIDEBAR_MENU.find( "li ul" ).slideUp();
        }
      }

      $li.addClass('active');

      $('ul:first', $li).slideDown(function() {
        setContentHeight();
      });
    }
  });

  // toggle small or large menu
  $MENU_TOGGLE.on('click', function() {
    if (common_debug) {
      console.log('clicked - menu toggle');
    }

    if ($BODY.hasClass('nav-md')) {
      $SIDEBAR_MENU.find('li.active ul').hide();
      $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
    } else {
      $SIDEBAR_MENU.find('li.active-sm ul').show();
      $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
    }

    $BODY.toggleClass('nav-md nav-sm');

    setContentHeight();

    $('.dataTable').each(function () {
      $(this).dataTable().fnDraw();
    });
  });

  // check active menu
  $SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

  $SIDEBAR_MENU.find('a').filter(function () {
    return this.href == CURRENT_URL;
  }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
    setContentHeight();
  }).parent().addClass('active');

  // recompute content when resizing
  $(window).smartresize(function(){
    setContentHeight();
  });

  setContentHeight();

  // fixed sidebar
  if ($.fn.mCustomScrollbar) {
    $('.menu_fixed').mCustomScrollbar({
      autoHideScrollbar: true,
      theme: 'minimal',
      mouseWheel:{ preventDefault: true }
    });
  }
}

var randNum = function() {
  return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
};

// Panel toolbox
$(document).ready(function() {
  $('.collapse-link').on('click', function() {
    var $BOX_PANEL = $(this).closest('.x_panel');
    var $ICON = $(this).find('i');
    var $BOX_CONTENT = $BOX_PANEL.find('.x_content');

    // fix for some div with hardcoded fix class
    if ($BOX_PANEL.attr('style')) {
      $BOX_CONTENT.slideToggle(200, function(){
        $BOX_PANEL.removeAttr('style');
      });
    } else {
      $BOX_CONTENT.slideToggle(200);
      $BOX_PANEL.css('height', 'auto');
    }

    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
  });

  $('.close-link').click(function () {
    var $BOX_PANEL = $(this).closest('.x_panel');

    $BOX_PANEL.remove();
  });
});
// /Panel toolbox

// Tooltip
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip({
    container: 'body'
  });
});
// /Tooltip

// Accordion
$(document).ready(function() {
  $(".expand").on("click", function () {
    $(this).next().slideToggle(200);
    $expand = $(this).find(">:first-child");

    if ($expand.text() == "+") {
      $expand.text("-");
    } else {
      $expand.text("+");
    }
  });
});
// /Accordion

// NProgress
if (typeof NProgress !== 'undefined') {
  $(document).ready(function () {
    NProgress.start();
  });

  $(window).load(function () {
    NProgress.done();
  });
}
// /NProgress

//hover and retain popover when on popover content
var originalLeave = $.fn.popover.Constructor.prototype.leave;

$.fn.popover.Constructor.prototype.leave = function(obj) {
  var self = obj instanceof this.constructor ?
    obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type);
  var container, timeout;

  originalLeave.call(this, obj);

  if (obj.currentTarget) {
    container = $(obj.currentTarget).siblings('.popover');
    timeout = self.timeout;
    container.one('mouseenter', function() {
      //We entered the actual popover – call off the dogs
      clearTimeout(timeout);
      //Let's monitor popover content instead
      container.one('mouseleave', function() {
        $.fn.popover.Constructor.prototype.leave.call(self, self);
      });
    });
  }
};

$('body').popover({
  selector: '[data-popover]',
  trigger: 'click hover',
  delay: {
    show: 50,
    hide: 400
  }
});




/* CUSTOM NOTIFICATION */
function init_CustomNotification() {
  if (common_debug) {
    console.log('run_customtabs');
  }

  if (typeof (CustomTabs) === 'undefined') {
    return;
  }

  if (common_debug) {
    console.log('init_CustomTabs');
  }

  var cnt = 10;

  TabbedNotification = function(options) {
    var message = "<div id='ntf" + cnt + "' class='text alert-" + options.type + "' style='display:none'><h2><i class='fa fa-bell'></i> " + options.title +
      "</h2><div class='close'><a href='javascript:;' class='notification_close'><i class='fa fa-close'></i></a></div><p>" + options.text + "</p></div>";

    if (!document.getElementById('custom_notifications')) {
      alert('doesnt exists');
    } else {
      $('#custom_notifications ul.notifications').append("<li><a id='ntlink" + cnt + "' class='alert-" + options.type + "' href='#ntf" + cnt + "'><i class='fa fa-bell animated shake'></i></a></li>");
      $('#custom_notifications #notif-group').append(message);
      cnt++;
      CustomTabs(options);
    }
  };

  CustomTabs = function(options) {
    $('.tabbed_notifications > div').hide();
    $('.tabbed_notifications > div:first-of-type').show();
    $('#custom_notifications').removeClass('dsp_none');
    $('.notifications a').click(function(e) {
      e.preventDefault();
      var $this = $(this),
        tabbed_notifications = '#' + $this.parents('.notifications').data('tabbed_notifications'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
      others.removeClass('active');
      $this.addClass('active');
      $(tabbed_notifications).children('div').hide();
      $(target).show();
    });
  };

  CustomTabs();

  var tabid = idname = '';

  $(document).on('click', '.notification_close', function(e) {
    idname = $(this).parent().parent().attr("id");
    tabid = idname.substr(-2);
    $('#ntf' + tabid).remove();
    $('#ntlink' + tabid).parent().remove();
    $('.notifications a').first().addClass('active');
    $('#notif-group div').first().css('display', 'block');
  });
}


/* COMPOSE */
function init_compose() {
  if (typeof ($.fn.slideToggle) === 'undefined') {
    return;
  }

  if (common_debug) {
    console.log('init_compose');
  }

  $('#compose, .compose-close').click(function(){
    $('.compose').slideToggle();
  });
}

$(document).ready(function() {
  // init_sparklines();
  // init_flot_chart();
  init_sidebar();
  // init_wysiwyg();
  // init_InputMask();
  // init_JQVmap();
  // init_cropper();
  // init_knob();
  // init_IonRangeSlider();
  // init_ColorPicker();
  // init_TagsInput();
  // init_parsley();
  // init_daterangepicker();
  // init_daterangepicker_right();
  // init_daterangepicker_single_call();
  // init_daterangepicker_reservation();
  // init_SmartWizard();
  // init_EasyPieChart();
  // init_charts();
  // init_echarts();
  // init_morris_charts();
  // init_skycons();
  // init_select2();
  // init_validator();
  // init_DataTables();
  // init_chart_doughnut();
  // init_gauge();
  // init_PNotify();
  // init_starrr();
  // init_calendar();
  init_compose();
  init_CustomNotification();
  // init_autosize();
  // init_autocomplete();
});
