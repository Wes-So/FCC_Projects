$(function(){
	var DEF_SESSION = 1;
	var DEF_BREAK = 1;
	var intervalId = 0;
	var isRunning = false;
	var isSession = true;
	var start = new Date();
 	
 	//set default session/break values
 	
 	$("#duration").text(DEF_SESSION);
	$("#sessionValue").text(DEF_SESSION);
	$("#breakValue").text(DEF_BREAK);
	start.setMinutes(DEF_SESSION);
	start.setSeconds(0);

	//main function that handles the countdown feature

	function countDown(){	
		var displayTime = 0;
		var displaySeconds = 0;
 		var prevSeconds = start.getSeconds();
 		start.setSeconds(prevSeconds - 1);

 		if(start.getMinutes() == 0 && start.getSeconds() == 0){
 			clearInterval(intervalId);
 		}

		displaySeconds = (start.getSeconds()).toString();
		displayTime = start.getMinutes() + ":" + displaySeconds.padStart(2,"0");
		$("#duration").text(displayTime);
		console.log(displayTime);
	}



	$("#main").click(function(){		
		if(isRunning){
			clearInterval(intervalId);	
			isRunning = false;
		} else {
			intervalId = setInterval(countDown,1000); 
			isRunning = true;
		}
	})






	//code that handles adjustment of time for break/sessions

	$("#breakReduce").click(function(){
		var value = Number($("#breakValue").text());
		if(value > 1){
			$("#breakValue").text(value - 1);
		}
	})

	$("#breakIncrease").click(function(){ 
		var value = Number($("#breakValue").text());
		$("#breakValue").text(value + 1);
		
	})

	$("#sessionReduce").click(function(){
		var value = Number($("#sessionValue").text());
		if(value > 1){
			$("#sessionValue").text(value - 1);
		}
	})

	$("#sessionIncrease").click(function(){ 
		var value = Number($("#sessionValue").text());
		$("#sessionValue").text(value + 1);
		
	})
});
