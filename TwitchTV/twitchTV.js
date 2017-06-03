var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(function(){
	var urlUsers ='https://wind-bow.gomix.me/twitch-api/users/'
	var urlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/'
	var cors = '?callback=?'
	$.each(streamers,function(val){	
		var online = false;
		var url = '';
		$.getJSON(urlStreams + streamers[val] + cors, function(data) { 
			if(data.stream !== null){
				online = true;
			}
		});

		$.getJSON(urlUsers + streamers[val] + cors, function(data) { 
			var bio = data.bio === null?"No description available":data.bio;
			bio = online?bio:'Offline'; 
			var status = online?' online':' offline'; 
			$("#list_group")
	       	.append('<li class="list-group-item' + status + '"><div class="row"><div class="col-md-2"><img class="img-thumbnail img-circle img-responsive" src="'+ data.logo + '"></div><div class="col-md-4"><a target="_blank" href="https://www.twitch.tv/'+ streamers[val] +'">' + data.display_name + '</a></div><div class="col-md-6 italic">' + bio +'</div></div></li>');		 
		});
	});

	$("#on").click(function(){
		console.log("Online button clicked");
		$("[class*='offline']").each(function(){
			$(this).addClass("hidden");
		}) 

		$("[class*='online']").each(function(){
			$(this).removeClass("hidden");
		}) 
	})

	$("#off").click(function(){
		console.log("Offline button clicked");
		$("[class*='offline']").each(function(){
			$(this).removeClass("hidden");
		}) 

		$("[class*='online']").each(function(){
			$(this).addClass("hidden");
		}) 
	})

	$("#all").click(function(){
		console.log("All button clicked");
		$("li").each(function(){
			$(this).removeClass("hidden");
		}) 
	})
})

  