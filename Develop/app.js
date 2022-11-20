var block = {};

var Date = moment();

$("#modalTime").datepicker({
    dateFormat: 'yyy-dd-mm',
    function(printTime){
        var newDate = Date;
        var hour = newDate.getHours();
        var minute = newDate.getMinutes();
        $("#modalTime").val(printTime)
    }
});



var createBlock = function(blockText, blockTime, dayList) {
  var dayLi = $("<li>").addClass("list-group-item");
  var daySpan = $("<span>")
    .addClass("badge badge-primary badge-pill")
    .text(blockTime);
  var blockP = $("<p>")
    .addClass("m-1")
    .text(blockText);

  dayLi.append(daySpan, blockP);
  $("#list-" + dayList).append(dayLi);
};

var loadBlocks = function() {
  block = JSON.parse(localStorage.getItem("block"));

  if (!block) {
    block = {
      toDo: [],
      inProgress: [],
      inReview: [],
      done: []
    };
  }

  $.each(block, function(list, arr) {
    arr.forEach(function(block) {
      createTask(block.text, block.time, list);
    });
  });
};

var saveBlock = function() {
  localStorage.setItem("block", JSON.stringify(block));
};



    // loop over current set of children in sortable list
    $(this)
      .children()
      .each(function() {
        // save values in temp array
        tempArr.push({
          text: $(this)
            .find("p")
            .text()
            .trim(),
          date: $(this)
            .find("span")
            .text()
            .trim()
        });
      });




$("#block-form-modal").on("show.bs.modal", function() {
  $("#modalBlockDescription, #modalTime").val("");
});

// modal is fully visible
$("#block-form-modal").on("shown.bs.modal", function() {
  // highlight textarea
  $("#modalBlockDescription").trigger("focus");
});

// save button in modal was clicked
$("#block-form-modal .btn-save").click(function() {
  // get form values
  var blockText = $("#modalBlockDescription").val();
  var blockTime = $("#modalTime").val();

  if (blockText && blockTime) {
    createTask(blockText, blockTime, "toDo");

    // close modal
    $("#block-form-modal").modal("hide");

    // save in tasks array
    block.toDo.push({
      text: blockText,
      date: blockTime
    });

    saveTasks();
  }
});

// task text was clicked
$(".list-group").on("click", "p", function() {
  // get current text of p element
  var text = $(this)
    .text()
    .trim();

  // replace p element with a new textarea
  var textInput = $("<textarea>").addClass("form-control").val(text);
  $(this).replaceWith(textInput);

  // auto focus new element
  textInput.trigger("focus");
});

  // recreate p element
  var taskP = $("<p>")
    .addClass("m-1")
    .text(text);


// load tasks for the first time
loadBlock();
