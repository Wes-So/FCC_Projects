 
$(function(){

   $("#first").css('display','none');  
   $('#second').css('display','none');


   $(".square").click(function(){ 
 	  console.log("test click");
      $("#" + this.id ).text("x");
   })
 })