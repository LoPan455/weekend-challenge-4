console.log('JS has been sourced properly');
var taskIdToDelete ={}

$(document).ready(function(){
  console.log('jQuery has been sourced properly');
  writeTasksToDom();

    //listener for the new task submit button
    $('#newTaskSubmitButton').on('click',function(){
      var newTaskName = {};
      newTaskName.task_name = $('#taskNameInput').val();
      // POST request to write new task to the db
      $.ajax({
        type: 'POST',
        url: '/tasks/submitTask',
        data: newTaskName,
        success: function(response){
          console.log('submit successful, server response: ',response);
          writeTasksToDom();
        },
        error: function(response){
          console.log('error on submit',response);
        }
      });//end ajax
    });// end submit button event handler

    //listener for the task delete button
    $('#taskItems').on('click','.deleteButton',function(){
      var $thisRow = $(this).parent().parent()
      taskIdToDelete.id = $(this).data('taskid');
      swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
      },
        function(response){
        if (response == true) {
          console.log('you clicked ok');
          deleteTask();
          $thisRow.remove();
        } else {
          console.log('you clicked cancel');
        }
      }); //end SWAL
    }); // end Delete listener

    // listener for the task complete button
    $('#taskItems').on('click','.completeCheckbox',function(){
      var taskIdToComplete = {}
      taskIdToComplete.id = $(this).data('taskid');
      $(this).parent().prev().toggleClass('complete');
      // POST request to update  the db
      $.ajax({
        type: 'PUT',
        url: '/tasks/completeTask',
        data: taskIdToComplete,
        success: function(response){
          console.log('submit successful, server response: ',response);
          writeTasksToDom();
        },
        error: function(response){
          console.log('error on submit',response);
        }
      });// end ajax
    }); // end COMPLETE button listener
}); //end of document.ready


// DELETE request to delete the task from the db
function deleteTask(){
  $.ajax({
    type: 'DELETE',
    url: '/tasks/deleteTask',
    data: taskIdToDelete,
    success: function(response){
      console.log('submit successful, server response: ',response);
    },
    error: function(response){
      console.log('error on submit',response);
    }
  });// end ajax
}//end deleteTask function


//GET reqeust to pull from DB
function writeTasksToDom(){
  $.ajax({
    type: 'GET',
    url: 'tasks/getTasks',
    success: function(response){
      //initialize a variable to hold the HTML string we want to eventually add to the DOM
      var htmlToAppend = '';
      //create the html string for each row we get back from the db
      for (var i = 0; i < response.length; i++) {
        var taskToWrite = response[i];
        var completionStatus;
        if (taskToWrite.complete == true){
          completionStatus = 'complete'
        }
        var newRowHTML = '<tr><td class="taskName '+completionStatus+'">'+ taskToWrite.task_name +'</td>'+
          '<td><input type="checkbox" class="completeCheckbox" data-taskid="'+taskToWrite.id+'"'+ 'name="checkbox"></td>'+
          '<td><button type="button" class="button deleteButton" data-taskid="'+taskToWrite.id+'"'+ 'name="button">Delete</button></td></tr>';
        htmlToAppend += newRowHTML;
      }//end for Loop
      $('#taskItems').empty();
      $('#taskItems').append(htmlToAppend);
    },//end SUCCESS function
    error: function(response){
      console.log('We ran into an error with the GET request');
    }

  }); //end AJAX
}//end function writeTasksToDom
