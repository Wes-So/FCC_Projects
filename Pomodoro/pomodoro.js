$(function(){

	var minutes = 25;
	var seconds = 60;
	var intervalId = 0;
	var isRunning = false;
 
	function countDown(){	
		var displayTime = 0;
		var displaySeconds = 0;

		seconds -= 1;
		if(seconds === 0){
			minutes -= 1
			seconds = 60;
			displayTime = minutes;
		} else {
			displaySeconds = seconds;
			if(seconds < 10) {
				displaySeconds = "0" + seconds;
			}

			displayTime = minutes + ":" + displaySeconds;
		}

		$("#duration").text(displayTime);
		console.log(displayTime);


	}


	$("#main").click(function(){
		
		if(isRunning){
			clearInterval(intervalId);	
			isRunning = false;
		} else {
			// minutes = $()
			minutes -= 1;
			intervalId = setInterval(countDown,1000); 
			isRunning = true;
		}
	})


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