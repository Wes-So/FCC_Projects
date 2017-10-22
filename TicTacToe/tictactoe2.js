$(function(){ 
  
  var board = [];
  var player1;
  var player2; 

  var view = { 
    initialize: function(){
      $('#play_mode').css('display','block');  
      $('#play_token').css('display','none');
      $('#message').css('display','none');
      $('#board').css('display','none');
      $('#scores').addClass('not-visible');
      $('#player1').addClass('not-visible');
      $('#player2').addClass('not-visible');
      this.clearCells();
    },

    displayPlayModeScreen: function(){
      $('#play_mode').css('display','block');  
      $('#play_token').css('display','none');
    },

    displayPlayTokenScreen: function(){
	  $('#play_token').toggle();
      $('#play_mode').toggle();    	
    }, 

    displayBoard: function() {
      $('#board').css('display','block');  
      $('#play_token').css('display','none');
      $('#scores').removeClass('not-visible').addClass('visible'); 
      this.displayScores();
      this.displayPlayerTurn();  
    },

    displayPlayerTurn: function(){
      $('#player1').removeClass('visible').addClass('not-visible'); 
      $('#player2').removeClass('visible').addClass('not-visible');
      console.log(model.getCurrentPlayer().name);
      if(model.getCurrentPlayer().name == 'Player 1'){
        console.log('im here');
        $('#player1').removeClass('not-visible').addClass('visible').text(model.getCurrentPlayer().name);
      } else {
        $('#player2').removeClass('not-visible').addClass('visible').text(model.getCurrentPlayer().name);
      } 
    }, 

    displayScores(){
      $('#onePscore').text(model.player1 == null? 0 : model.player1.score);
      $('#twoPscore').text(model.player2 == null ? 0 : model.player2.score);
    }, 

    displayHit: function(tile){  
      $('#' + tile).text(model.getCurrentPlayer().token); 
    },

    clearCells: function(){
      $('.square').map(function(){$('#' + this.id).text('').css('color','white');})
    },

    applyColorToCells: function(one, two, three, color){ 
      $('#' + one).css('color', color);
      $('#' + two).css('color', color);
      $('#' + three).css('color', color);
    },

    highlightCells: function(one, two, three){
      this.applyColorToCells(one, two, three, '#4a8cf7'); 
    } 

  };

  var controller = {
 
  	initialize: function(){
      model.player1 = null;
      model.player2 = null;
      model.board = [];
  	  view.initialize();
  	},

    createOneHumanPlayer: function(){
      model.player1 = model.createPlayer('1','Human');
      model.player2 = model.createPlayer('2', 'CPU');
      view.displayPlayTokenScreen();
    },

    createTwoHumanPlayers:function(){
      model.player1 = model.createPlayer('1','Human');
      model.player2 = model.createPlayer('2', 'Human');
      view.displayPlayTokenScreen();
    },

    setPlayersTokens: function(token){
      console.log(token);
      model.player1.token  = token;
      model.player1.turn = true;
      model.player2.token = token == 'X' ? 'O':'X';
    },

    createAndDisplayBoard: function(){
      model.createBoard();
      view.displayBoard();
    },

    startNewGame: function(){
      view.clearCells();  
      model.board = []; //can we move this to the model???
      model.initializeBoard();
      if(model.getCurrentPlayer().type == 'CPU')
        this.processCPUWithDelay();
    },

    announceDraw: function(){
      alert("We have a draw");
      this.startNewGame();
    },

    announceWin: function(){
      alert(model.getCurrentPlayer().name + ' won!!!');
      model.incrementCurrentPlayerScore();
      view.displayScores();
      this.startNewGame();
    },

    setPlayerTile: function(tile){
      if(model.getCurrentPlayer().type != 'CPU' && ! model.isPaused && model.isValidHit(tile)){
         model.updateBoard(tile); 
         view.displayHit(tile);
         this.validateResults();  
      }
    },

    validateResults: function(){
      var _this = this;
      if(model.isWinning(model.board,model.getCurrentPlayer().token)){
         model.isPaused = true;
         var combo = model.getWinningCombo();
         view.highlightCells(combo[0],combo[1],combo[2]);
         window.setTimeout(() => _this.announceWin(), 2000);
      } else if(model.isBoardFull()){
         model.isPaused = true; 
         window.setTimeout(() => _this.announceDraw(),2000);
      } else {
         model.switchTurns();
      }      
    },

    processCPUWithDelay: function(){
      var _this = this;
      window.setTimeout(()=>_this.processCPU(),2000);
    },

    processCPU: function(){
      var slots = model.getEmpties();
      var cpuPlay = this.findBestMove(slots,model.getCurrentPlayer().token);
      console.log('cpu play:=' + cpuPlay);

      var humanPlay = -1;

      if(cpuPlay == -1){
         console.log('human player token:=' + model.getLastPlayer().token); 
         slots = model.getEmpties();
         humanPlay = this.findBestMove(slots, model.getLastPlayer().token);
      }
      
      cpuPlay = cpuPlay > -1 ? cpuPlay:humanPlay;
      console.log("cpuPlay:" + cpuPlay);

      if(cpuPlay == -1){
        cpuPlay = model.getRandomSlot(); 
        console.log("random:=" + cpuPlay); 
      } 
      model.updateBoard(cpuPlay);
      view.displayHit(cpuPlay); 
      this.validateResults();
     },

    findBestMove: function(slots, token){
      console.log("Processing this token:=" + token);
      if(slots.length == 0){ 
        return -1;
      }  

      var simBoard = model.board.slice();
      var slot = slots.shift() - 1; 
      simBoard[slot] = token; 
      console.log(simBoard)
      if(model.isWinning(simBoard,token)){
        slot += 1;   
        return slot;
      } else {
        return this.findBestMove(slots,token);
      } 
    } 
  }

  var model = {
  	numPlayers : 0,
    board : [],
    isPaused : false, 
    player1: null,
    player2: null,


    initializeBoard: function(){
      this.isPaused = false;
      this.createBoard();
      this.switchTurns();
    },

    createBoard : function(){ 
      for(var i = 0; i <9; i++){
       this.board.push(i+1);
      }
    },

    getRandomSlot:function(){
      var slots = this.getEmpties();
      console.log('empties:=' + slots);
      var slot = Math.floor(Math.random() * slots.length);
      return slots[slot];
    },

    getEmpties: function(){
      return this.board.filter(s => s != 'O' && s!='X');
    },

    isBoardFull : function(){
      return (this.board.filter(s => s != 'O' && s!='X')).length === 0; 
    },

    isWinning: function(board, val){
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
   },

    getWinningCombo: function(){
      var combo;
      var val = this.getCurrentPlayer().token;
      var board = this.board;
      if(board[0] == val && board[1] == val && board[2] == val) 
         combo = [1,2,3];
      else if(board[0] == val && board[3] == val && board[6] == val)
         combo = [1,4,7];
      else if (board[0] == val && board[4] == val && board[8] == val)
         combo = [1,5,9];
      else if (board[1] == val && board[4] == val && board[7] == val)
         combo = [2,5,8];
      else if (board[2] == val && board[4] == val && board[6] == val)
         combo = [3,5,7];
         //console.log("i'm here");
      else if (board[3] == val && board[4] == val && board[5] == val)
         combo = [4,5,6];
      else if (board[6] == val && board[7] == val && board[8] == val)
         combo = [7,8,9];
      else if (board[2] == val && board[5] == val && board[8] == val)
         combo = [3,6,9];
      return combo;
      
    },

    updateBoard : function(tile){
      this.board[tile - 1] = this.getCurrentPlayer().token;
    }, 

    getCurrentPlayer : function(){
      return this.player1.turn ? this.player1 : this.player2;
    },

    getLastPlayer : function(){
      return this.player1.turn ? this.player2 : this.player1;
    },

    switchTurns : function(){
      var currentPlayer = this.getCurrentPlayer();
      var lastPlayer = this.getLastPlayer();
      currentPlayer.turn = false;
      lastPlayer.turn = true;
      view.displayPlayerTurn(); 
    },

    createPlayer : function(key,type){
      var player = {
       id: key,
       name : 'Player ' + key,
       score : 0,
       token : '' ,
       type: type,
       turn: false
      }
      return player;
    },

    incrementCurrentPlayerScore : function(){
      this.getCurrentPlayer().score += 1;
    },

    isValidHit: function(tile){
      console.log(this.board[tile - 1]);
      return !isNaN(this.board[tile - 1]); 
    }
  } 

  controller.initialize();

  $('#1p').click(function(){
    controller.createOneHumanPlayer();
  }) 

  $('#2p').click(function(){
    controller.createTwoHumanPlayers();
  })  

  $('#back').click(function(){
    controller.initialize();
  }) 

  $("#select_token button").click(function(){ 
    controller.setPlayersTokens(this.id); 
    console.log(model.player1);
    console.log(model.player2);
    controller.createAndDisplayBoard();
  }) 

  $('#reset').click(function(){
  	controller.initialize(); 
  })  

  $('.square').click(function(){  
    controller.setPlayerTile(this.id); 
    if(model.getCurrentPlayer().type === 'CPU' && !model.isPaused){
      controller.processCPUWithDelay();
    }
  }) 


})