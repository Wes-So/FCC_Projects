$(function(){
	var DEF_SESSION = 1;
	var DEF_BREAK = 1;
	var intervalId = 0;
	var isRunning = false;
	var isSession = true;
	var start = new Date();
 	
 	//set default session/break values 	
 	setDefaults();

	//main function that handles the countdown feature

	function countDown(){	
		var displayTime = 0;
		var displaySeconds = 0;
 		var prevSeconds = start.getSeconds();
 		start.setSeconds(prevSeconds - 1);

 		if(start.getMinutes() == 0 && start.getSeconds() == 0){
 			clearInterval(intervalId);
 			isSession ? startBreak() : startSession();
 		}

		displaySeconds = (start.getSeconds()).toString();
		displayTime = start.getMinutes() + ":" + displaySeconds.padStart(2,"0");
		$("#duration").text(displayTime);
	}

	function startTimer(val){
		$("#duration").text(val);
		start.setMinutes(val);
		start.setSeconds(0);		
		intervalId = setInterval(countDown,1000); 
		isRunning = true;
	}

	function startSession(){
		$("#mode").text("Session");
		var val = $("#sessionValue").text();		
		isSession = true;
		startTimer(val);
	}

	function startBreak(){		
		$("#mode").text("Break");
		var val = $("#breakValue").text()				
		isSession = false;
		startTimer(val);
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
		if(!isRunning){
		  var value = Number($("#breakValue").text());
		  if(value > 1)
		  	value -= 1;
		  setBreakValue(value);
		}
	})

	$("#breakIncrease").click(function(){ 
		if(!isRunning){
     	  var value = Number($("#breakValue").text()) + 1;
		  setBreakValue(value);
		}
	})


	function setBreakValue(val){ 
		$("#breakValue").text(val);
		if(!isSession){						
			$("#duration").text(val); 
			console.log("setting break value");
			start.setMinutes(val);
			start.setSeconds(0);
		}
	}

	$("#sessionReduce").click(function(){
		if(!isRunning){
		  var value = Number($("#sessionValue").text()) ;
		  if(value > 1)
		 	value -= 1;
		  setSessionValue(value);
		}
	})	

	$("#sessionIncrease").click(function(){ 
		if(!isRunning){
	      var value = Number($("#sessionValue").text()) + 1; 		  
 		  setSessionValue(value);
		}
	})

	function setSessionValue(val){ 
		$("#sessionValue").text(val);		
		if(isSession){						
			$("#duration").text(val); 
			console.log("setting start value");
			start.setMinutes(val);
			start.setSeconds(0);
		}
	}

	//utility functions
	function setDefaults(){
	  $("#duration").text(DEF_SESSION);
	  $("#sessionValue").text(DEF_SESSION);
	  $("#breakValue").text(DEF_BREAK);
	  start.setMinutes(DEF_SESSION);
	  start.setSeconds(0);
	}
});
