$(function(){
   
  var text = 'Would you like to be X or O?'; 
  var is1P = true; 
  var isStopped = false;
  var player1;
  var player2;
  var currentPlayer;
  var lastPlayer;

  initialize();

  function initialize(){
  	player1 = createPlayer(1);
  	player2 = createPlayer(2); 
	
	  is1P = true;  
	  isStopped=false;
	
	  $('#first').css('display','block');  
	  $('#second').css('display','none');
	  $('#message').css('display','none');
    $('#board').css('display','none');
    $('#scores').addClass('not-visible');
    $('.player').hide();
    $('#onePscore').text(player1.score);
    $('#twoPscore').text(player2.score);	
    
    clearCells();
  } 

  function createPlayer(name) {
  	return {
    	name : 'Player ' + name,
  		score : 0,
  		val : '' ,
      turn: $('#player' + name)
      }
  	}
   

  $('#reset').click(function(){
  	initialize(); 
  }) 

  $('#back').click(function(){
  	switchMode();
  })  

  //FIRST INTERFACE
  $('#1p').click(function(){ 
  	player2.name = 'CPU';
	$('#chooseText').text(text);
	switchMode(); 
  }) 

  $('#2p').click(function(){
  	$('#chooseText').text(player1.name + ' : ' +  text);
  	switchMode(); 
  })

  //SECOND INTERFACE
  $('#X').click(function(){
  	updatePlayerVal('X','O');  	
  	showBoard(); 
  }) 

  $('#O').click(function(){
  	updatePlayerVal('O','X');  	
  	showBoard(); 
  })

  function updatePlayerVal(x, y){
  	player1.val  = x;
  	player2.val = y;
  }

  //THIRD INTERFACE
  $('.square').click(function(){  
    if($('#' + this.id ).text() === '' && !isStopped){
      getCurrentAndLastPlayers();	  
	    $('#' + this.id ).text(currentPlayer.val);	  
	    if(isWinner(this.id,currentPlayer.val)){
	      updateScores();
 	      message = currentPlayer.name + ' wins. Congratulations!!!';	  	 
	  	  endOfRound(message);
	   } else if(allFilled()){	     
	      message = 'We got a draw...'; 	
 	  	  endOfRound(message);
	   } else {
        switchVal();
     } 
  	}
  })

  function updateScores(){
  	var score = 0;
  	if(is1P){
  		score = player1.score;
  		player1.score = score  + 1;
  	} else {
  		score = player2.score;
  		player2.score = score + 1;
  	}
  }

  function endOfRound(message){
  	isStopped = true;
	  setTimeout(function() { 
	   $('#message').text(message);
	   $('#message').toggle();
	   $('table').addClass('transparent');
	   $('#onePscore').text(player1.score);
      $('#twoPscore').text(player2.score);    			
   	    setTimeout(function() {
          $('#message').toggle(); 
     	      clearCells();
     	      isStopped=false
     	      $('table').removeClass('transparent');
            switchVal();  
		    }, 2000); 
	  }, 2000);	
  }
 

  //logic code
  function isWinner(id,val){
  	switch(id) {
  		case '1':
  		  return checkHorizontal(0,val) || checkVertical(0,val) || checkDiagonal(0,4,val);
  		  break;
  		case '2':
  		  return checkHorizontal(0,val) || checkVertical(1,val);
  		  break;
  		case '3':
  		  return checkHorizontal(0,val) || checkVertical(2,val) || checkDiagonal(2,2,val);
  		  break;
  		case '4':
  		  return checkHorizontal(3,val) || checkVertical(0,val);
  		  break;
  		case '5':
  		  return checkHorizontal(3,val) || checkVertical(1,val) || checkDiagonal(2,2,val) || checkDiagonal(0,4,val);
  		  break;  
  		case '6':
  		  return checkHorizontal(3,val) || checkVertical(2,val);
  		  break;
  		case '7':
  		  return checkHorizontal(6,val) || checkVertical(0,val) || checkDiagonal(2,2,val);
  		  break; 
  		case '8':
  		  return checkHorizontal(6,val) || checkVertical(1,val);
  		  break;  		
  		case '9':
  		  return checkHorizontal(6,val) || checkVertical(2,val) || checkDiagonal(0,4,val);
  		  break;  		
  		default :
  			return false; 
  	} 
  }

  function switchVal(){
    is1P = is1P ? false : true; 
    getCurrentAndLastPlayers();
    showPlayerName();    
  }

  function checkHorizontal(idx,val){  
	return checkWinner(idx,1,val);  
  } 

  function checkVertical(idx,val){  
	return checkWinner(idx,3,val);  
  }

  function checkDiagonal(idx,icr,val){
  	return checkWinner(idx,icr,val); 
  }

  function checkWinner(idx, icr, val){
  	var cells = $('.square'); 
  	var one = $('#' + cells[idx].id ) ;
  	var two = $('#' + cells[idx + icr].id ) ;
  	var three = $('#' + cells[idx + icr + icr].id);
	var result = one.html() === val && two.html() === val && three.html() === val;

	if(result) 
		highlightCells(one, two, three);	 

	return result;  	 
  } 

  function allFilled() {
  	var cells = $('.square');
  	for(var i = 0; i<cells.length; i++){ 
  		var value = $('#' + cells[i].id ).html();
  		if(value === '')
  			return false; 
  	}
  	return true; 
  }

  //accessory functions
  function highlightCells(one, two, three){ 
    one.css('color', '#4a8cf7');
   	two.css('color', '#4a8cf7');
   	three.css('color', '#4a8cf7');
  }

  function clearCells(){
   	var cells = $('.square');
  	for(var i = 0; i<cells.length; i++){ 
   		$('#' + cells[i].id ).text('').css('color','white');
  	} 	
  }

  function switchMode(){
  	 $('#second').toggle();
  	 $('#first').toggle();   	
  }

  function showBoard(){
  	$('#second').toggle();
   	$('#board').toggle();  
    $('#scores').removeClass('not-visible');
    $('#scores').addClass('visible');  
    showPlayerName();
  }  


  function getCurrentAndLastPlayers(){
    currentPlayer = is1P ? player1 : player2;
    lastPlayer = is1P ? player2 : player1;
  }

  function showPlayerName(){
    getCurrentAndLastPlayers();
    currentPlayer.turn.show("2000");
    lastPlayer.turn.hide("5000");
  }

})