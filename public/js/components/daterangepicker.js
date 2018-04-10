/*
 * Function : daterangepicker.js
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
window.admin.daterangepicker = (function () {
  var debug_daterangepicker = false;
  var default_minDate = moment(moment().format('2015-01-01'));
  var default_startDate = moment(moment().format('YYYY-MM-DD')).subtract(29, 'days');
  var default_endDate = moment(moment().format('YYYY-MM-DD'));

  var option = {
    startDate: default_startDate,
    endDate: default_endDate,
    minDate: default_minDate,
    maxDate: moment(moment().format('YYYY-MM-DD')).add(1, 'years'),
    dateLimit: {
      days: 60
    },
    showDropdowns: true,
    showWeekNumbers: true,
    timePicker: false,
    timePickerIncrement: 1,
    timePicker12Hour: true,
    ranges: {
      '오늘': [moment(), moment()],
      '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      '지난 7일': [moment().subtract(6, 'days'), moment()],
      '지난 30일': [moment().subtract(29, 'days'), moment()],
      '이번달': [moment().startOf('month'), moment().endOf('month')],
      '지난달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    opens: 'left',
    buttonClasses: ['btn btn-default'],
    applyClass: 'btn-small btn-primary',
    cancelClass: 'btn-small',
    format: 'YYYY-MM-DD',
    separator: ' to ',
    locale: {
      applyLabel: '설정',
      cancelLabel: '취소',
      fromLabel: '시작',
      toLabel: '끝',
      customRangeLabel: '사용자설정',
      daysOfWeek: ['일', '월', '화', '수', '목', '금', '토'],
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      firstDay: 1
    }
  }

  /* DATERANGEPICKER */
  function init_daterangepicker(contentId, data) {
    if (typeof ($.fn.daterangepicker) === 'undefined' || !contentId) {
      return;
    }

    if (debug_daterangepicker) {
      console.log('init_daterangepicker');
    }

    elementSelecter = '#reportrange-' + contentId;

    var cb = function(start, end, label) {
      if (debug_daterangepicker) {
        console.log(start.toISOString(), end.toISOString(), label);
      }
      $(elementSelecter + ' span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
    };

    // Set default date
    $(elementSelecter + ' span').html(moment(default_startDate).format('YYYY-MM-DD') + ' - ' + moment(default_endDate).format('YYYY-MM-DD'));
    if (data) {
      data.params.searchDate.startDate = default_startDate.format('YYYY-MM-DD HH:mm:ss:');
      data.params.searchDate.endDate = default_endDate.format('YYYY-MM-DD HH:mm:ss');
    }

    $(elementSelecter).daterangepicker(option, cb);

    // Sample code
    // $(elementSelecter).on('show.daterangepicker', function() {
    //   if (debug_daterangepicker) {
    //     console.log("show event fired");
    //   }
    // });
    //
    // $(elementSelecter).on('hide.daterangepicker', function() {
    //   if (debug_daterangepicker) {
    //     console.log("hide event fired");
    //   }
    // });
    //
    // $(elementSelecter).on('apply.daterangepicker', function(ev, picker) {
    //   if (debug_daterangepicker) {
    //     console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
    //   }
    // });
    //
    // $(elementSelecter).on('cancel.daterangepicker', function(ev, picker) {
    //   if (debug_daterangepicker) {
    //     console.log("cancel event fired");
    //   }
    // });

    $('#destroy').click(function() {
      $(elementSelecter).data('daterangepicker').remove();
    });
  }

  function init_daterangepicker_right() {
    if (typeof ($.fn.daterangepicker) === 'undefined') {
      return;
    }
    console.log('init_daterangepicker_right');

    var cb = function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
      $('#reportrange_right span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    };

    var optionSet1 = {
      startDate: moment().subtract(29, 'days'),
      endDate: moment(),
      minDate: '01/01/2012',
      maxDate: '12/31/2020',
      dateLimit: {
        days: 60
      },
      showDropdowns: true,
      showWeekNumbers: true,
      timePicker: false,
      timePickerIncrement: 1,
      timePicker12Hour: true,
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      },
      opens: 'right',
      buttonClasses: ['btn btn-default'],
      applyClass: 'btn-small btn-primary',
      cancelClass: 'btn-small',
      format: 'MM/DD/YYYY',
      separator: ' to ',
      locale: {
        applyLabel: 'Submit',
        cancelLabel: 'Clear',
        fromLabel: 'From',
        toLabel: 'To',
        customRangeLabel: 'Custom',
        daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        firstDay: 1
      }
    };

    $('#reportrange_right span').html(moment().subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

    $('#reportrange_right').daterangepicker(optionSet1, cb);

    $('#reportrange_right').on('show.daterangepicker', function() {
      console.log("show event fired");
    });
    $('#reportrange_right').on('hide.daterangepicker', function() {
      console.log("hide event fired");
    });
    $('#reportrange_right').on('apply.daterangepicker', function(ev, picker) {
      console.log("apply event fired, start/end dates are " + picker.startDate.format('MMMM D, YYYY') + " to " + picker.endDate.format('MMMM D, YYYY'));
    });
    $('#reportrange_right').on('cancel.daterangepicker', function(ev, picker) {
      console.log("cancel event fired");
    });

    $('#options1').click(function() {
      $('#reportrange_right').data('daterangepicker').setOptions(optionSet1, cb);
    });

    $('#options2').click(function() {
      $('#reportrange_right').data('daterangepicker').setOptions(optionSet2, cb);
    });

    $('#destroy').click(function() {
      $('#reportrange_right').data('daterangepicker').remove();
    });
  }

  function init_daterangepicker_single_call() {
    if (typeof ($.fn.daterangepicker) === 'undefined') {
      return;
    }

    console.log('init_daterangepicker_single_call');

    $('#single_cal1').daterangepicker({
      singleDatePicker: true,
      singleClasses: "picker_1"
    }, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    $('#single_cal2').daterangepicker({
      singleDatePicker: true,
      singleClasses: "picker_2"
    }, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    $('#single_cal3').daterangepicker({
      singleDatePicker: true,
      singleClasses: "picker_3"
    }, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    $('#single_cal4').daterangepicker({
      singleDatePicker: true,
      singleClasses: "picker_4"
    }, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });
  }

  function init_daterangepicker_reservation() {
    if (typeof ($.fn.daterangepicker) === 'undefined') {
      return;
    }

    console.log('init_daterangepicker_reservation');

    $('#reservation').daterangepicker(null, function(start, end, label) {
      console.log(start.toISOString(), end.toISOString(), label);
    });

    $('#reservation-time').daterangepicker({
      timePicker: true,
      timePickerIncrement: 30,
      locale: {
        format: 'MM/DD/YYYY h:mm A'
      }
    });
  }

  return {
    init_daterangepicker: init_daterangepicker,
    init_daterangepicker_right: init_daterangepicker_right,
    init_daterangepicker_single_call: init_daterangepicker_single_call,
    init_daterangepicker_reservation: init_daterangepicker_reservation
  }
})();

// $(document).ready(function() {
//   admin.daterangepicker.init_daterangepicker();
//   admin.daterangepicker.init_daterangepicker_right();
//   admin.daterangepicker.init_daterangepicker_single_call();
//   admin.daterangepicker.init_daterangepicker_reservation();
// });
