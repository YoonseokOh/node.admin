/*
 * Function : tagsinput.js
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
window.admin.tagsinput = (function () {
  /* INPUTS */
  function onAddTag(tag) {
    alert("Added a tag: " + tag);
  }

  function onRemoveTag(tag) {
    alert("Removed a tag: " + tag);
  }

  function onChangeTag(input, tag) {
    alert("Changed a tag: " + tag);
  }

  //tags input
  function init_TagsInput() {
    if (typeof $.fn.tagsInput !== 'undefined'){
      $('#tags_1').tagsInput({
        width: 'auto'
      });
    }
  }

  return {
    init_TagsInput: init_TagsInput
  }
})();

$(document).ready(function() {
  admin.tagsinput.init_TagsInput();
});
