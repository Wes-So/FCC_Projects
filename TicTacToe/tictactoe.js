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
    //var num = Math.floor(Math.random() * 2) + 1; 
    var num = 2;
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

      setTimeout(function() {
        processCPU();
      }, 1000); 
    } 
  })

  function announceVictor(){
    updateScores();
    message = currentPlayer.name + ' wins. Congratulations!!!';      
    endOfRound(message);
  }

  function processCPU(){
    if(player2.name == 'CPU'){
      var slots = getEmpties(getBoard());
      var minmax = recurCPU(slots,player2);
      //console.log(minmax);
      if(minmax){
        //announceVictor();
      } else { 
        console.log('now checking for human winning combo');
        slots = getEmpties(getBoard());
        var humanWins = recurCPU(slots,player1);
        if(!humanWins){
          var slot = getRandomSlot();         
          $('#' + slot).text(currentPlayer.val); 
        } 
        switchVal();    
      }
    }
  }

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
  function isWinning(board, val){
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
    aiFirstDraw();
  } 

  function aiFirstDraw(){
    if(currentPlayer.name == 'CPU'){
      var randomSlot = getRandomSlot();
      $('#' + randomSlot).text(currentPlayer.val); 
      switchVal();       
    }
  }

  function getRandomSlot(){
    var slots = getEmpties(getBoard());
    var random = Math.floor(Math.random() * slots.length) + 1;
    return slots[random];
  }

  function getCurrentAndLastPlayers(){
    currentPlayer = player1.isTurn ? player1 : player2;
    lastPlayer = player1.isTurn ? player2 : player1;
  }

  function showPlayerName(){
    getCurrentAndLastPlayers();
    currentPlayer.turn.addClass("visible").removeClass('not-visible').text(currentPlayer.name);
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

  function recurCPU(slots, player){ 
    console.log(slots);
    if(slots.length == 0){ 
      return false;
    } 
    

    var val = player.val;
    var board = getBoard();
    var slot = slots.shift() - 1; 
    board[slot] = val; 
    console.log(board);
    if(isWinning(board,val)){
      console.log('winning'); 
      slot = slot + 1; 
      $('#' + slot ).text(player2.val);  //call a method here  
      return true;
    } else {
      return recurCPU(slots,player);
    }   
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


})