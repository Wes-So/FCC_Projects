var streamers = ["brunofin","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];
var urlUsers ='https://wind-bow.gomix.me/twitch-api/users/'
var urlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/'
var cors = '?callback=?'

$(function(){
	getTwitchData(streamers);

	$("#on").click(function(){ 
		showOnline();
	})

	$("#off").click(function(){ 
		showOffline();
	})

	$("#all").click(function(){
		$("#data").remove();
		getTwitchData(streamers); 
	})
})

function showOnline(){
		$("[class*='offline']").each(function(){
			$(this).addClass("hidden");
		}) 

		$("[class*='online']").each(function(){
			$(this).removeClass("hidden");
		}) 
}

function showOffline(){
		$("[class*='offline']").each(function(){
			$(this).removeClass("hidden");
		}) 

		$("[class*='online']").each(function(){
			$(this).addClass("hidden");
		}) 	
}

function getTwitchData(streamers){
	 $("#list_group").append('<span id="data"></span>');

	$.each(streamers,function(val){	
		var online = false;
		var url = '';
		var text = ''       
		$.getJSON(urlStreams + streamers[val] + cors, function(data) { 
			if(data.stream !== null){
				online = true;
				var stream = data.stream;
				text = stream.game + ': ' + stream.channel['status'];
				console.log(text);
			}
		});

		$.getJSON(urlUsers + streamers[val] + cors, function(data) { 
			var error = data.status === 404?true:false;
			text = online?text:'Offline'; 
            text = error?data.message:text
			var status = online?' online':' offline'; 
			var name = error?streamers[val]:data.display_name;
			var link = error?'"#"':'"https://www.twitch.tv/'+ streamers[val] +'"';
			var logo = error?'':data.logo;
			$("#data")
	       	.append('<li class=" streams list-group-item' + status + '"><div class="row"><div class="col-md-2"><img class="img-thumbnail img-circle img-responsive" src="'+ logo + '"></div><div class="col-md-4"><a target="_blank" href=' + link + '">'+ name + '</a></div><div class="col-md-6 italic">' + text +'</div></div></li>');		 
		});
	});
 }
