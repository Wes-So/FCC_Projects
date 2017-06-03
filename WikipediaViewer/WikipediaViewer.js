//https://en.wikipedia.org/w/api.php?action=opensearch&search=Einstein&prop=revisions&rvprop=content&format=json


$(function () {
	var remoteUrlWithOrigin = 'https://en.wikipedia.org/w/api.php?action=opensearch&prop=revisions&rvprop=content&origin=*&format=json&search=';

    $("#search").click(function() {         	
        $("#search").toggle();         	
        $("#form").toggle().fadeIn();
        $("#input").focus(); 
        $("#clickSearch").toggle();	
        
	});

	$("#remove").click(function(){
        $("#search").toggle();    
        $("#input").val('');     	
        $("#form").toggle();
        $("#topdiv").addClass("topspace"); 
        $("#clickSearch").toggle();	
        $("#results").remove();
	});

	$("#input").keypress(function(e){
     	var key = e.which;     	        	
  	    if(key == 13){	        		
    		var params= $("#input").val();
			var data = ["Einstein",["Einstein","Einstein family","Einstein field equations","Einsteinium","Einstein on the Beach","Einstein coefficients","Einstein Papers Project","Einstein ring","Einstein\u2013Szil\u00e1rd letter","Einstein notation"],["","The Einstein family is the family of the renowned physicist Albert Einstein (1879\u20131955). Einstein\'s great-great-great-great-grandfather, Jakob Weil, was his oldest recorded relative, born around the turn of the 16th century, and the family continues to this day.","The Einstein field equations (EFE; also known as \"Einstein\'s equations\") is the set of 10 equations in Albert Einstein\'s general theory of relativity that describes the fundamental interaction of gravitation as a result of spacetime being curved by mass and energy.","Einsteinium is a synthetic element with symbol Es and atomic number 99. It is the seventh transuranic element, and an actinide.","Einstein on the Beach is an opera in four acts (framed and connected by five \"knee plays\" or intermezzos), composed by Philip Glass and directed by theatrical producer Robert Wilson.","Einstein coefficients are mathematical quantities which are a measure of the probability of absorption or emission of light by an atom or molecule.","The Einstein Papers Project was established in 1986 to assemble, preserve, translate, and publish papers selected from the literary estate of Albert Einstein (more than forty thousand documents) and from other collections (more than 15,000 Einstein-related documents).","In observational astronomy an Einstein ring, also known as an Einstein-Chwolson ring or Chwolson ring, is the deformation of the light from a source (such as a galaxy or star) into a ring through gravitational lensing of the source\'s light by an object with an extremely large mass (such as another galaxy or a black hole).","The Einstein\u2013Szil\u00e1rd letter was a letter written by Le\u00f3 Szil\u00e1rd and signed by Albert Einstein that was sent to the United States President Franklin D.","In mathematics, especially in applications of linear algebra to physics, the Einstein notation or Einstein summation convention is a notational convention that implies summation over a set of indexed terms in a formula, thus achieving notational brevity."],["https://en.wikipedia.org/wiki/Einstein","https://en.wikipedia.org/wiki/Einstein_family","https://en.wikipedia.org/wiki/Einstein_field_equations","https://en.wikipedia.org/wiki/Einsteinium","https://en.wikipedia.org/wiki/Einstein_on_the_Beach","https://en.wikipedia.org/wiki/Einstein_coefficients","https://en.wikipedia.org/wiki/Einstein_Papers_Project","https://en.wikipedia.org/wiki/Einstein_ring","https://en.wikipedia.org/wiki/Einstein%E2%80%93Szil%C3%A1rd_letter","https://en.wikipedia.org/wiki/Einstein_notation"]];
	

            $("#results").remove();
	        $("#topdiv").removeClass("topspace").addClass("center");
			$("#topdiv").after('<div id="results" class="container spacebetween"><div id="listGroup" class="list-group"></div></div>');

			$.each(data[1],function(i,val){					       	
		       	$("#listGroup").append('<a target="_blank" href="' + data[3][i]+ '" class="list-group-item"><p class="title">' + val + '</p><p class="desc">' + data[2][i] + '</p></a>');
            })

            $("a").hover(function(){
            	$(this).css("border-left-color","#ff9933");
            }, function(){
				$(this).css("border-left-color","#ddd");
            });
            

    		   	        		
			// $.ajax( {
			// 		    url: remoteUrlWithOrigin + params,
			// 		    data: 'String',
			// 		    dataType: 'json',
			// 		    type: 'POST',
			// 		    headers: { 'Api-User-Agent': 'Example/1.0'},
			// 		    success: function(data) {
			// 				$.each(data[1],function(i,val){					       	
			// 			       	$("#listGroup").append('<a target="_blank" href="' + data[3][i]+ '" class="list-group-item"><p class="title">' + val + '</p><p class="desc">' + data[2][i] + '</p></a>');
			// 	            })

			// 	            $("a").hover(function(){
			// 	            	$(this).css("border-left-color","#ff9933");
			// 	            }, function(){
			// 					$(this).css("border-left-color","#ddd");
			// 	            });
			// 		    }
			// });
  		}
	});

});



