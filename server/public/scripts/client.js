console.log('JS has been sourced properly');

$(document).ready(function(){
  console.log('jQuery has been sourced properly');


//get rqeust to pull from DB
  $.ajax({
    type: 'GET',
    url: 'tasks/getTasks',
    success: function(response){
      console.log('we got a response from the server: ', response);
    }
  })

//post request to create a new item in the db

//DELETE request to delete an item




}); //end of document.ready
