$(function(){
   
  var text = 'Would you like to be X or O?'; 
  var isStopped = false;
  var player1;
  var player2;
  var currentPlayer;
  var lastPlayer;

  initialize();

  function initialize(){
  	player1 = createPlayer(1);
  	player2 = createPlayer(2); 
    getFirstPlayer()
	
	  is1P = true;  
	  isStopped=false;
	
	  $('#first').css('display','block');  
	  $('#second').css('display','none');
	  $('#message').css('display','none');
    $('#board').css('display','none');
    $('#scores').addClass('not-visible');
    $('#player1').addClass('not-visible');
    $('#player2').addClass('not-visible');
    redisplayScores();    
    clearCells();
  } 

  function createPlayer(name) {
  	return {
      id: name,
    	name : 'Player ' + name,
  		score : 0,
  		val : '' ,
      turn: $('#player' + name),
      isTurn:false
    }
  } 
   
  function getFirstPlayer(){
    var num = Math.floor(Math.random() * 2) + 1; 
    var firstPlayer = num == 1?player1:player2;
    setIsTurnToTrue(firstPlayer); 
    getCurrentAndLastPlayers(); 
  }

  function setIsTurnToTrue(player){
    player.isTurn = true;
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
	    $('#' + this.id ).text(currentPlayer.val);	  
	    if(isWinning(getBoard(),currentPlayer.val)){
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
    currentPlayer.score = currentPlayer.score + 1;
  }

  function endOfRound(message){
  	isStopped = true;
	  setTimeout(function() { 
	   $('#message').text(message);
	   $('#message').toggle();
	   $('table').addClass('transparent');
     redisplayScores();			
     setTimeout(function() {
          $('#message').toggle(); 
     	      clearCells();
     	      isStopped=false
     	      $('table').removeClass('transparent');
            switchVal();  
		    }, 2000); 
	  }, 2000);	
  }
 
  function redisplayScores(){
    $('#onePscore').text(player1.score);
    $('#twoPscore').text(player2.score);
  }

  //logic code
  // function isWinner(id,val){
  // 	switch(id) {
  // 		case '1':
  // 		  return checkHorizontal(0,val) || checkVertical(0,val) || checkDiagonal(0,4,val);
  // 		  break;
  // 		case '2':
  // 		  return checkHorizontal(0,val) || checkVertical(1,val);
  // 		  break;
  // 		case '3':
  // 		  return checkHorizontal(0,val) || checkVertical(2,val) || checkDiagonal(2,2,val);
  // 		  break;
  // 		case '4':
  // 		  return checkHorizontal(3,val) || checkVertical(0,val);
  // 		  break;
  // 		case '5':
  // 		  return checkHorizontal(3,val) || checkVertical(1,val) || checkDiagonal(2,2,val) || checkDiagonal(0,4,val);
  // 		  break;  
  // 		case '6':
  // 		  return checkHorizontal(3,val) || checkVertical(2,val);
  // 		  break;
  // 		case '7':
  // 		  return checkHorizontal(6,val) || checkVertical(0,val) || checkDiagonal(2,2,val);
  // 		  break; 
  // 		case '8':
  // 		  return checkHorizontal(6,val) || checkVertical(1,val);
  // 		  break;  		
  // 		case '9':
  // 		  return checkHorizontal(6,val) || checkVertical(2,val) || checkDiagonal(0,4,val);
  // 		  break;  		
  // 		default :
  // 			return false; 
  // 	} 
  // }

  function isWinning(board, val){
    console.log(val);
    if(
      (board[0] == val && board[1] == val && board[2] == val) ||
      (board[0] == val && board[3] == val && board[6] == val) ||
      (board[0] == val && board[4] == val && board[8] == val) ||
      (board[1] == val && board[4] == val && board[7] == val) ||
      (board[2] == val && board[4] == val && board[6] == val) ||
      (board[3] == val && board[4] == val && board[5] == val) ||
      (board[6] == val && board[7] == val && board[8] == val) ||
      (board[2] == val && board[5] == val && board[8] == val))
      return true;

    return false;


  }

  function switchVal(){
    currentPlayer = player1.isTurn ? player2 : player1;    
    setIsTurnToTrue(currentPlayer)
    lastPlayer = currentPlayer.id == 1 ? player2 : player1;
    lastPlayer.isTurn = false;
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
	  var result = one.html() === val && 
                 two.html() === val && 
                 three.html() === val;

	  if(result) 
		  highlightCells(one, two, three);	 

	  return result;  	 
  } 

  function allFilled() { 
    return  $(".square:empty").length === 0; 
  }

  //accessory functions
  function highlightCells(one, two, three){ 
    one.css('color', '#4a8cf7');
   	two.css('color', '#4a8cf7');
   	three.css('color', '#4a8cf7');
  }

  function clearCells(){
    $('.square').map(function(){
      $('#' + this.id).text(''); 
    }) 
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
    currentPlayer = player1.isTurn ? player1 : player2;
    lastPlayer = player1.isTurn ? player2 : player1;
  }

  function showPlayerName(){
    getCurrentAndLastPlayers();
    currentPlayer.turn.addClass("visible").removeClass('not-visible');
    lastPlayer.turn.removeClass('not-visible').addClass('not-visible');
  }

  function getBoard(){
    var board = [];
    $('.square').each(function(){      
      var item = $('#' + this.id).text() ? $('#' + this.id).html() : this.id; 
      board.push(item);
    })
    return board;
  }

  function getEmpties(board){
    return board.filter(s => s != 'O' && s!='X');
  }

})