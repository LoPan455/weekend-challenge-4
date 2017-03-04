console.log('JS has been sourced properly');

$(document).ready(function(){
  console.log('jQuery has been sourced properly');



  //GET reqeust to pull from DB
    $.ajax({
      type: 'GET',
      url: 'tasks/getTasks',
      success: function(response){
        console.log('we got a response from the server: ', response);
      }
    });

  //listener for the task submit button
    $('#newTaskSubmitButton').on('click',function(){
      console.log('submit button clicked');
      var newTaskName = $('#taskNameInput').val();
      // POST request to write new task to the db
      $.ajax({
        type: 'POST',
        url: '/tasks/submitTask',
        data: newTaskName,
        success: function(response){
          console.log('submit successful, server response: ',response);
        },
        error: function(response){
          console.log('error on submit',response);
        }
      })//end ajax
    });// end submit button event handler



  //listener for the task delete button
    $('#deleteButton').on('click',function(){
      console.log('delete button clicked');
      var taskIdToDelete = $(this).data('taskid');
      console.log('taskID to delete is: ',taskIdToDelete);
      // POST request to write new task to the db
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
    }); // end DELETE button listener

  // listener for the task complete button

    $('#completeButton').on('click',function(){
      console.log('complete button clicked');
      var taskIdToComplete = $(this).data('taskid');
      console.log('taskID to complete is: ',taskIdToComplete);
      // POST request to write new task to the db
      $.ajax({
        type: 'POST',
        url: '/tasks/completeTask',
        data: taskIdToComplete,
        success: function(response){
          console.log('submit successful, server response: ',response);
        },
        error: function(response){
          console.log('error on submit',response);
        }
      });// end ajax
    }); // end COMPLETE button listener



}); //end of document.ready
