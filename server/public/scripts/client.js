console.log('JS has been sourced properly');
var taskIdToDelete ={} //called in deleteTask() function

$(document).ready(function(){
  console.log('jQuery has been sourced properly');
  //renders on the DOM the inital set of records from the db
  writeTasksToDom();

    //listener for the new task submit button
    $('#newTaskSubmitButton').on('click',function(){
      //initialize an object to send to the server
      var newTaskName = {};
      //capture the name of the task to be added
      newTaskName.task_name = $('#taskNameInput').val();
      // POST request to write new task to the db
      $.ajax({
        type: 'POST',
        url: '/tasks/submitTask',
        data: newTaskName,
        success: function(response){
          console.log('submit successful, server response: ',response);
          //refresh the page with the updated task along with
          //previousuly entered tasks
          writeTasksToDom();
        },
        error: function(response){
          console.log('error on submit',response);
        }
      });
    });

    //listener for the task delete button
    $('#taskItems').on('click','.deleteButton',function(){
      var $thisRow = $(this).parent().parent()
      taskIdToDelete.id = $(this).data('taskid');
      //SweetAlert confirmation modal will ask to confirm choice
      //user can cancel the operation
      swal({
        title: "Are you sure?",
        text: "This task will be removed forever",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yep, it's done",
      },
        function(response){
        if (response == true) {
          deleteTask();
          $thisRow.remove();
        } else {
          console.log('you clicked cancel');
        }
      });
    });

    // listener for the task complete checkbox
    $('#taskItems').on('click','.completeCheckbox',function(){
      //initialize an object to send back to the server
      var taskIdToComplete = {}
      //adds the id of the task to mark as complete from it's //HTML 'data-taskid' attribute
      taskIdToComplete.id = $(this).data('taskid');
      //adds or removes the '.complete' class on the completed
      //item for styling purposes
      $(this).parent().prev().toggleClass('complete');
      // POST request to update the db
      $.ajax({
        type: 'PUT',
        url: '/tasks/completeTask',
        data: taskIdToComplete,
        success: function(response){
          console.log('submit successful, server response: ',response);
          //refresh the page with the updated task along with
          //previousuly entered tasks
          writeTasksToDom();
        },
        error: function(response){
          console.log('error on submit',response);
        }
      });
    });
});


// DELETE request to delete the task from the db
function deleteTask(){
  $.ajax({
    type: 'DELETE',
    url: '/tasks/deleteTask',
    data: taskIdToDelete,
    success: function(response){
      console.log(response);
    },
    error: function(response){
      console.log('error on delete request',response);
    }
  });
}


//GET reqeust to pull from DB
function writeTasksToDom(){
  $.ajax({
    type: 'GET',
    url: 'tasks/getTasks',
    success: function(response){
      var htmlToAppend = ''; //initialize a variable to hold the HTML string we want to eventually add to the DOM

      //create the html string for each row we get back from the db
      for (var i = 0; i < response.length; i++) {
        var taskToWrite = response[i]; //temporarily stores each row returned from the db
        var completionStatus; //will be set on each task depending on it's 'completed' attribute and then written into the HTML class attribute

        //checks to see if a task is already complete, if so adds a 'complete' class to the html element for styling
        if (taskToWrite.complete == true){
          completionStatus = 'complete'
        }
        var newRowHTML = '<tr class="newRow"><td class="taskName '+completionStatus+'">'+ taskToWrite.task_name +'</td>'+
          '<td><input type="checkbox" class="completeCheckbox" data-taskid="'+taskToWrite.id+'"'+ 'name="checkbox"></td>'+
          '<td><button type="button" class="button deleteButton" data-taskid="'+taskToWrite.id+'"'+ 'name="button">Delete</button></td></tr>'; //generates the HTML for each recored returned from the db.
        //cumulatively builds the entire HTML string for every record returned from the db.
        htmlToAppend += newRowHTML;
      }
      //clears previsouly rendered data
      $('#taskItems').empty();
      //finally appends the entire HTML string to the DOM
      $('#taskItems').append(htmlToAppend);
    },
    error: function(response){
      console.log('We ran into an error with the GET request');
    }
  });
}
