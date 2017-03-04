console.log('JS has been sourced properly');

$(document).ready(function(){
  console.log('jQuery has been sourced properly');
  writeTasksToDom();

    //listener for the new task submit button
    $('#newTaskSubmitButton').on('click',function(){
      console.log('submit button clicked');
      var newTaskName = {};
      newTaskName.task_name = $('#taskNameInput').val();
      console.log('I picked up this task name: ',newTaskName);
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
    $('#taskGrid').on('click','.deleteButton',function(){
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
    $('#taskGrid').on('click','.completeButton',function(){
      console.log('complete Button clicked');
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


//GET reqeust to pull from DB
function writeTasksToDom(){
  $.ajax({
    type: 'GET',
    url: 'tasks/getTasks',
    success: function(response){
      console.log('we got a response from the server: ', response);
      //concat the html to be added to the dom for each item in the array
      var htmlToAppend = '';
      for (var i = 0; i < response.length; i++) {
        var taskToWrite = response[i];
        var newRowHTML = '<tr><td>'+ taskToWrite.task_name +'</td>'+
          '<td><button type="button" class="button completeButton" data-taskid="'+taskToWrite.id+'"'+ 'name="button">Completed!</button></td>'+
          '<td><button type="button" class="button deleteButton" data-taskid="'+taskToWrite.id+'"'+ 'name="button">Delete</button></td></tr>';
        htmlToAppend += newRowHTML
      }//end for Loop
      $('#taskGrid').empty();
      $('#taskGrid').append(htmlToAppend);
    }
  });

}
