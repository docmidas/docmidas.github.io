console.log("I'm working");
prompt("Hello");

$(document).ready(function(){
  // $.ajax(ajaxArgument)
  // $.ajax(ajaxArgument2)
  // $.ajax(ajaxArgument3)
  // $.ajax(ajaxArgument4)
  // $.ajax(omdbArg1)
  // $.ajax(omdbArg2)
  // $.ajax(omdbArg3)
  // $.ajax(gameArg)
  //$.ajax(pokeArg)
  $.ajax(bggArg)


})


var bggArg = {
  type: 'get',
  url: 'http://www.boardgamegeek.com/xmlapi2/id?194286',
  dataType: 'xml',
    success: function(responseData){
      console.log(responseData);      
    },
    error: function(error){
      console.log(error);
    }
  }