/*
 * Function : datatables.js
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
window.admin.datatables = (function () {
  var debug_datatables = false;
  if (debug_datatables) {
    console.log('run_datatables');
  }
  var init_pipeline_done = false;

  /* DATA TABLES */
  function init_DataTables() {
    if (typeof ($.fn.DataTable) === 'undefined') {
      return;
    }

    if (debug_datatables) {
      console.log('init_DataTables');
    }

    var handleDataTableButtons = function() {
      if ($("#datatable-buttons").length) {
        $("#datatable-buttons").DataTable({
          dom: "Bfrtip",
          buttons: [
            {
              extend: "copy",
              className: "btn-sm"
            },
            {
              extend: "csv",
              className: "btn-sm"
            },
            {
              extend: "excel",
              className: "btn-sm"
            },
            {
              extend: "pdfHtml5",
              className: "btn-sm"
            },
            {
              extend: "print",
              className: "btn-sm"
            },
          ],
          responsive: true
        });
      }
    };

    TableManageButtons = function() {
      "use strict";
      return {
        init: function() {
          handleDataTableButtons();
        }
      };
    }();

    $('#datatable').dataTable();

    $('#datatable-keytable').DataTable({
      keys: true
    });

    $('#datatable-responsive').DataTable();

    $('#datatable-scroller').DataTable({
      ajax: "js/datatables/json/scroller-demo.json",
      deferRender: true,
      scrollY: 380,
      scrollCollapse: true,
      scroller: true
    });

    $('#datatable-fixed-header').DataTable({
      fixedHeader: true
    });

    var $datatable = $('#datatable-checkbox');

    $datatable.dataTable({
      'order': [[ 1, 'asc' ]],
      'columnDefs': [
        { orderable: false, targets: [0] }
      ]
    });

    $datatable.on('draw.dt', function() {
      $('checkbox input').iCheck({
        checkboxClass: 'icheckbox_flat-green'
      });
    });

    TableManageButtons.init();
  }

  function countChecked() {
    if (checkState === 'all') {
      $(".bulk_action input[name='table_records']").iCheck('check');
    }

    if (checkState === 'none') {
      $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
      $('.column-title').hide();
      $('.bulk-actions').show();
      $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
      $('.column-title').show();
      $('.bulk-actions').hide();
    }
  }

  function init_data() {
    if (debug_datatables) {
      console.log('[init_data]')
    }
    return {
      params : {
        searchFee: {
          type: 0,
          min: 0,
          max: 0
        },
        searchDate: {
          type: 0,
          startDate: 0,
          endDate: 0
        },
        searchWord: ''
      },
      cache: {
        cacheLower: -1,
        cacheUpper: null,
        cacheLastRequest: null,
        cacheLastJson: null
      },
      req: {
        ajax: false,
        requestStart: 0,
        requestEnd: 0,
        requestLength: 0,
        drawStart: 0
      },
      config: {
        pages: 5,
        url: ''
      },
      customParams: []
    };
  }

  function init_pipeline() {
    if (typeof ($.fn.DataTable) === 'undefined' || init_pipeline_done) {
      return;
    }
    init_pipeline_done = true;

    $.fn.dataTable.pipeline = function (data) {
      return function (request, drawCallback, settings) {
        data.req.ajax = false;
        data.req.requestStart = request.start;
        data.req.requestEnd = request.start + request.length;
        data.req.requestLength = request.length;
        data.req.drawStart = request.start;

        // <!-- query
        request.order = {
          data: request.columns[request.order[0].column].data,
          dir: request.order[0].dir
        };

        // Customized search and columns -> delete these
        delete request.search;
        delete request.columns;

        var customParams = data.customParams;
        if (customParams && Array.isArray(customParams) && customParams.length > 0) {
          customParams.forEach(function(item) {
            if (item.id) {
              request[item.id] = item.value;

              // Cache check
              if (data.cache.cacheLastRequest && JSON.stringify(request[item.id]) !== JSON.stringify(data.cache.cacheLastRequest[item.id])) {
                data.req.ajax = true;
              }
            }
          })
        }

        var searchFee = data.params.searchFee;
        if (searchFee && searchFee.type) {
          request.feeRange = {
            type: searchFee.type > 0? searchFee.type : 0,
            start: searchFee.min,
            end: searchFee.max
          };
        }

        var searchDate = data.params.searchDate;
        if (searchDate && searchDate.type) {
          request.dateRange = {
            type: searchDate.type > 0? searchDate.type : 0,
            start: searchDate.startDate,
            end: searchDate.endDate
          };
        }

        var searchWord = data.params.searchWord;
        if (searchWord) {
          request.search = searchWord;
        }
        // query -->

        // <!-- caching
        if (!data.req.ajax) {
          if (settings.clearCache || !data.cache.cacheLastJson) {
            data.req.ajax = true;
            settings.clearCache = false;
          } else if (data.cache.cacheLower < 0 || data.req.requestStart < data.cache.cacheLower || data.req.requestEnd > data.cache.cacheUpper) {
            data.req.ajax = true;
          } else if (JSON.stringify(request.order) !== JSON.stringify(data.cache.cacheLastRequest.order) ||
            JSON.stringify(request.feeRange) !== JSON.stringify(data.cache.cacheLastRequest.feeRange) ||
            JSON.stringify(request.dateRange) !== JSON.stringify(data.cache.cacheLastRequest.dateRange) ||
            JSON.stringify(request.search) !== JSON.stringify(data.cache.cacheLastRequest.search))
          {
            data.req.ajax = true;
          }
        }

        data.cache.cacheLastRequest = $.extend(true, {}, request);
        // caching -->
        if (data.req.ajax) {
          if (data.req.requestStart < data.cache.cacheLower) {
            data.req.requestStart = data.req.requestStart - (data.req.requestLength * (data.config.pages - 1));

            if (data.req.requestStart < 0) {
              data.req.requestStart = 0;
            }
          }

          data.cache.cacheLower = data.req.requestStart;
          data.cache.cacheUpper = data.req.requestStart + (data.req.requestLength * data.config.pages);

          request.start = data.req.requestStart;
          request.length = data.req.requestLength * data.config.pages;

          settings.jqXHR = $.ajax({
            type: 'GET',
            url: data.config.url,
            data: request,
            dataType: 'json',
            cache: false,
            success: function (json) {
              data.cache.cacheLastJson = $.extend(true, {}, json);

              if (data.req.requestStart !== 0 && json.data.length === 0) {
                table.page('previous').draw('page');
                return;
              } else if (json.data.length < request.length) {
                json.recordsTotal = data.req.requestStart + json.data.length;
                json.recordsFiltered = data.req.requestStart + json.data.length;
              }
              if (data.cache.cacheLower !== data.req.drawStart) {
                json.data.splice(0, data.req.drawStart - data.cache.cacheLower);
              }
              if (data.req.requestLength >= -1) {
                json.data.splice(data.req.requestLength, json.data.length);
              }

              // @Todo: use multiple
              if (typeof admin.datatables.changeTotalText === 'function') {
                admin.datatables.changeTotalText(json);
              }

              drawCallback(json);
            }
          })
            .fail(function (jqXHR, textStatus, errorThrown) {
              drawCallback({data: []});
            });
        } else {
          var jsonCache = $.extend(true, {}, data.cache.cacheLastJson);
          jsonCache.draw = request.draw;

          if (jsonCache.data) {
            jsonCache.data.splice(0, data.req.requestStart - data.cache.cacheLower);
            jsonCache.data.splice(data.req.requestLength, jsonCache.data.length);

            var total = data.cache.cacheLower + data.cache.cacheLastJson.data.length;
            if (total < data.cache.cacheLower + data.req.requestLength * data.config.pages) {
              jsonCache.recordsTotal = total;
              jsonCache.recordsFiltered = total;
            }
          } else {
            jsonCache.data = [];
            jsonCache.recordsTotal = 0;
            jsonCache.recordsFiltered = 0;
          }

          drawCallback(jsonCache);
        }
      };
    };
  }

  function init_clearPipeline(tableName) {
    if (typeof ($.fn.DataTable) === 'undefined' || !tableName) {
      return;
    }

    $.fn.dataTable.Api.register('clearPipeline()', function () {
      return this.iterator(tableName, function (settings) {
        settings.clearCache = true;
      });
    });
  }

  // 검색어 창
  function init_search(contentId, data, table) {
    if (debug_datatables) {
      console.log('[init_search]');
      console.log(contentId);
      console.log(data);
      console.log(table);
    }

    if (typeof ($.fn.DataTable) === 'undefined' || !contentId || !table) {
      return;
    }

    var contentIdSelector = '#frm-search-' + contentId;
    $(contentIdSelector).submit(function () {
      data.params.searchWord = $(contentIdSelector + ' input').val();
      table.draw();
      return false;
    });

    $(contentIdSelector + ' button').click(function () {
      $(contentIdSelector).trigger('submit');
    });
  }

  // 금액 검색
  function init_searchFee(contentId, data, table) {
    if (debug_datatables) {
      console.log('[init_searchFee]');
      console.log(contentId);
      console.log(data);
      console.log(table);
    }

    if (typeof ($.fn.DataTable) === 'undefined' || !contentId || !data || !table) {
      return;
    }

    var default_min = 0;
    var default_max = 10000000;
    var limit_min = -10000000;
    var limit_max = 10000000;

    var contentIdSelector = '#' + contentId + ' ';
    var contentIdPost = '-' + contentId;
    var contentIdMin = '#min-fee' + contentIdPost;
    var contentIdMax = '#max-fee' + contentIdPost;

    // 검색 금액
    if (data.params && data.params.searchFee) {
      // 초기값 설정
      $(contentIdMin).val(default_min);
      data.params.searchFee.min = default_min;
      $(contentIdMax).val(default_max);
      data.params.searchFee.max = default_max;

      // 금액 선택 select box 동작
      $(contentIdSelector + '.dropdown-menu.fee-type a').each(function (idx, item) {
        $(item).click(function () {
          data.params.searchFee.type = idx;
          if (data.params.searchFee.type) {
            $(contentIdSelector + '.search-fee-type').text($(item).text());
          } else {
            $(contentIdSelector + '.search-fee-type').text('검색 금액');
          }
          table.draw();
        });
      });

      // min값 수정시
      $(contentIdMin).focusout(function () {
        var min = Number($(contentIdMin).val());
        var max = Number($(contentIdMax).val());

        if (!min || isNaN(min) || !$.isNumeric(min)) {
          $(contentIdMin).val(0);
          min = 0;
        }
        if (min < limit_min) {
          $(contentIdMin).val(limit_min);
          min = limit_min;
        }

        data.params.searchFee.min = min;
        if (min > max) {
          $(contentIdMax).val(min);
          data.params.searchFee.max = min;
        } else if (data.params.searchFee.type) {
          table.draw();
        }
      });

      // max값 수정시
      $(contentIdMax).focusout(function () {
        var min = Number($(contentIdMin).val());
        var max = Number($(contentIdMax).val());

        if (!max || isNaN(max) || !$.isNumeric(max)) {
          $(contentIdMax).val(0);
          max = 0;
        }
        if (max > limit_max) {
          $(contentIdMax).val(limit_max);
          max = limit_max;
        }

        data.params.searchFee.max = max;
        if (min > max) {
          $(contentIdMin).val(max);
          data.params.searchFee.min = max;
        } else if (data.params.searchFee.type) {
          table.draw();
        }
      });
    }
  }

  // 날짜 검색 - daterangepicker should be defined
  function init_searchDate(contentId, data, table) {
    if (typeof ($.fn.DataTable) === 'undefined' || !admin.daterangepicker || !data || !table) {
      return;
    }

    if (debug_datatables) {
      console.log('[init_searchDate]');
      console.log(contentId);
      console.log(data);
      console.log(table);
    }

    var contentIdSelector = '#' + contentId + ' ';
    var contentIdPost = '-' + contentId;

    // 기간 선택 select box 동작
    $(contentIdSelector + '.dropdown-menu.date-type a').each(function (idx, item) {
      $(item).click(function () {
        data.params.searchDate.type = idx;
        if (data.params.searchDate.type) {
          $(contentIdSelector + '.search-date-type').text($(item).text());
        } else {
          $(contentIdSelector + '.search-date-type').text('검색 기간');
        }
        table.draw();
      });
    });

    // 기간 선택 폼
    var contentIdRange = '#reportrange' + contentIdPost;
    $(contentIdRange).on('apply.daterangepicker', function (ev, picker) {
      data.params.searchDate.startDate = picker.startDate.format('YYYY-MM-DD HH:mm:ss');
      data.params.searchDate.endDate = picker.endDate.format('YYYY-MM-DD HH:mm:ss');
      table.draw();
    });

    // 기간 선택 취소 클릭시
    $(contentIdRange).on('cancel.daterangepicker', function (ev, picker) {
      data.params.type = 0;
      $(contentIdSelector + '.search-date-type').text('검색 기간');
      table.draw();
    });
  }

  function init_checkbox(contentId, data, table) {
    if (typeof ($.fn.DataTable) === 'undefined' || !data || !table) {
      return;
    }

    if (debug_datatables) {
      console.log('[init_checkbox]');
      console.log(contentId);
      console.log(data);
      console.log(table);
    }

    // 콤보박스 변경 시, 테이블 갱신
    var contentIdSelector = '#' + contentId + ' ';
    $('input').on('ifChanged', function(event){
      if (data.customParams.length > 0) {
        data.customParams.forEach(function(item, index) {
          if ($(contentIdSelector + '#' + item.id)) {
            data.customParams[index].value = $('#' + item.id).is(":checked");
          }
        });
      }
      table.draw();
    });
  }

  return {
    init_DataTables: init_DataTables,
    init_data: init_data,
    init_pipeline: init_pipeline,
    init_clearPipeline: init_clearPipeline,
    init_search: init_search,
    init_searchFee: init_searchFee,
    init_searchDate: init_searchDate,
    init_checkbox: init_checkbox,
    countChecked: countChecked
  }
})();

// $(document).ready(function() {
//   admin.datatables.init_DataTables();
// });
//
// $(document).ready(function() {
//   // Table
//   $('table input').on('ifChecked', function () {
//     checkState = '';
//     $(this).parent().parent().parent().addClass('selected');
//     admin.datatables.countChecked();
//   });
//
//   $('table input').on('ifUnchecked', function () {
//     checkState = '';
//     $(this).parent().parent().parent().removeClass('selected');
//     admin.datatables.countChecked();
//   });
//
//   var checkState = '';
//
//   $('.bulk_action input').on('ifChecked', function () {
//     checkState = '';
//     $(this).parent().parent().parent().addClass('selected');
//     admin.datatables.countChecked();
//   });
//
//   $('.bulk_action input').on('ifUnchecked', function () {
//     checkState = '';
//     $(this).parent().parent().parent().removeClass('selected');
//     admin.datatables.countChecked();
//   });
//
//   $('.bulk_action input#check-all').on('ifChecked', function () {
//     checkState = 'all';
//     admin.datatables.countChecked();
//   });
//
//   $('.bulk_action input#check-all').on('ifUnchecked', function () {
//     checkState = 'none';
//     admin.datatables.countChecked();
//   });
// });

