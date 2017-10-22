$(function(){ 
  var text = 'Would you like to be X or O?'; 
  var isStopped;
  var player1;
  var player2;
  var currentPlayer;
  var lastPlayer;
  var doneGame;
  var myBoard;


  initialize();
   
  function initialize(){
    myBoard = new Board();
    myBoard.initBoard();
    console.log(myBoard.board)
    player1 = createPlayer(1);
    player2 = createPlayer(2); 
    getFirstPlayer(); 
       
    isStopped=false;
    doneGame = false;
      
    initializeStyle(); 
    redisplayScores();    
    clearCells(); 
  } 
  
  function createPlayer(key) {
    return {
      id: key,
      name : 'Player ' + key,
      score : 0,
      val : '' ,
      turn: $('#player' + key),
      isTurn:false
    }
  } 
   
  function getFirstPlayer(){
    //var num = Math.floor(Math.random() * 2) + 1; 
    var num = 1;
    var firstPlayer = num == 1?player1:player2;
    setIsTurnToTrue(firstPlayer); 
    getCurrentAndLastPlayers(); 
  }

  function setIsTurnToTrue(player){
    player.isTurn = true;
  }

  //PLAY MODE SCREEN
  $('#1p').click(function(){ 
    player2.name = 'CPU';
    $('#chooseText').text(text);
    switchScreen(); 
  })  

  $('#2p').click(function(){
    $('#chooseText').text(player1.name + ' : ' +  text);
    switchScreen(); 
  })

   function switchScreen(){
     $('#play_token').toggle();
     $('#play_mode').toggle();    
  }

  //END OF PLAY MODE SCREEN

  //PLAY TOKEN SCREEN
  $('#X').click(function(){
    setPlayerTokens('X'); 
    showBoard();  
  }) 

  $('#O').click(function(){
    setPlayerTokens('O');   
    showBoard();  
  }) 

  function setPlayerTokens(player1Val){ 
    player1.val  = player1Val;
    player2.val = player1Val == 'X' ? 'O':'X';
  }

  $('#back').click(function(){
    switchScreen();
  })

  //END OF PLAY TOKEN SCREEN

  //BOARD INTERFACE
  $('.square').click(function(){ 
    if(isAllowedToPlay(this.id)){  
       myBoard.updateBoard(this.id, myBoard.board);
  
      if(myBoard.isWinning()){ 
         announceVictor();
      } else if(myBoard.isAllFilled()){ 
         announceDraw(); 
      } else {
         switchVal(); 
      }
      
      if(!doneGame){
        setTimeout(function() {
          processCPU();
        }, 1000); 
      }

      doneGame = false;
    } 
  }) 
  
  $('#reset').click(function(){
  	initialize(); 
  }) 

  function isAllowedToPlay(id){
    return currentPlayer.name != 'CPU' 
      && ! isNaN(myBoard.board[id - 1]) 
      && !isStopped;
  } 

  function makeAnnouncement(func){
    func();
  }

  function announceDraw(){
    endOfRound('We got a draw...');
  }

  function announceVictor(){ 
    currentPlayer.score++;
    message = currentPlayer.name + ' wins. Congratulations!!!';      
    endOfRound(message); 
  }

  function endOfRound(message){
    doneGame = true;
    isStopped = true;
    myBoard.initBoard();
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
            aiFirstDraw();  
        }, 2000); 
    }, 1000);
     
  }




  function processCPU(){
    if(player2.name == 'CPU'){
      isStopped = true;
 
      var slots = getEmpties(getBoard());
      var minmax = recurCPU(slots,player2);
 
      if(minmax){
        announceVictor();
      } else {
        slots = getEmpties(getBoard());
        var humanWins = recurCPU(slots,player1); 
        if(!humanWins){
          var slot = getRandomSlot();  
          console.log("Random slot:=" + slot);       
          $('#' + slot).text(currentPlayer.val) 
        }


        if(allFilled()){
          announceDraw();
        } else {
          switchVal();  
        }

         
            
      }
      isStopped = false;
    }
  }

  function updateScores(){
    currentPlayer.score = currentPlayer.score + 1;
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
  function Board() {
      var board = []; 

      var initBoard = function(){
        for(var i = 0; i <9; i++){
         this.board.push(i+1);
       }
      };
      
      var updateBoard = function(id){
        $('#'  + id ).text(currentPlayer.val);
        this.board[id - 1] = currentPlayer.val; 
      };

      var getBoard = function(){
        return this.board();
      };

      var isAllFilled = function() {
        return (this.board.filter(s => s != 'O' && s!='X')).length === 0; 
      }; 
 
      var isWinning = function(){
        var val = currentPlayer.val; 
        if(
          (this.board[0] == val && this.board[1] == val && this.board[2] == val) ||
          (this.board[0] == val && this.board[3] == val && this.board[6] == val) ||
          (this.board[0] == val && this.board[4] == val && this.board[8] == val) ||
          (this.board[1] == val && this.board[4] == val && this.board[7] == val) ||
          (this.board[2] == val && this.board[4] == val && this.board[6] == val) ||
          (this.board[3] == val && this.board[4] == val && this.board[5] == val) ||
          (this.board[6] == val && this.board[7] == val && this.board[8] == val) ||
          (this.board[2] == val && this.board[5] == val && this.board[8] == val))
          return true;

        return false; 
       };
     } 

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

  function showBoard(){
  	$('#play_token').toggle();
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
    console.log(slots);
    var random = Math.floor(Math.random() * slots.length);
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
     if(slots.length == 0){ 
      return false;
    } 
    

    var val = player.val;
    var board = getBoard();
    var slot = slots.shift() - 1; 
    board[slot] = val; 
    
    if(isWinning(board,val)){
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

  function isEmptySquare(square){
    return $('#' + square ).text() === '';
  }

  function hasWon(symbol){
    return isWinning(getBoard(),symbol);
  }

  function initializeStyle(){
    $('#play_mode').css('display','block');  
    $('#play_token').css('display','none');
    $('#message').css('display','none');
    $('#board').css('display','none');
    $('#scores').addClass('not-visible');
    $('#player1').addClass('not-visible');
    $('#player2').addClass('not-visible');
  }
})