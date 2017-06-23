
$(function(){
	var screenVal = '';
	var afterEval = false;
	var operators = ['/','*','+','-','='];
	$(":button").click(function(){   
		switch(this.id){
			case 'AC':
				clear();
				break;
			case 'CE': 
				clearEntry();	 
				break;
			case '=':
				if(!isEmpty(screenVal)){
					var result = eval(screenVal);
					$("#key").val(result);
					$("#screen").val(screenVal + '=' + result);
					screenVal = result;					
					afterEval = true;
				}
				break;
			default:
				var isNotNumeric = isNaN(this.id);	 
				if(isEmpty(screenVal) && (isNotNumeric || this.id == 0)) break;
				if(afterEval && !isNotNumeric){					
					screenVal = this.id					
				} else {
					screenVal += this.id;		
				}						
				afterEval = false;		
				$("#key").val(this.id);
				$("#screen").val(screenVal);	
		}		
	});	

	function isNaN(key){
		return Number.isNaN(Number(key));
	}

	function isEmpty(str){
		return (!str || 0 === str.length);
	}

    function clear(){
	  	screenVal = '';
	  	afterEval = true;
	  	$("#key").val('0');
	  	$("#screen").val('0');
	}

	function clearEntry(){
		$("#key").val('0');
	   	$("#screen").val(0);
	   	if(screenVal.length > 0) {
		   	if(!endsWithOperator()){
		   	    removeLastItem();	 
		   	} else {
	     		screenVal = screenVal.substring(0, screenVal.length - 1 );	
		   	}
		   	$("#screen").val(screenVal.length > 0?screenVal:'0');	   		
	   	}   	
	}

	function endsWithOperator(){
		if(screenVal.endsWith('+') ||
			screenVal.endsWith('-') ||
			screenVal.endsWith('*') ||
			screenVal.endsWith('/')){
			return true;
		} else {
			return false;
		}
	}

	function removeLastItem(){
		while(!endsWithOperator() && screenVal.length > 0){
			screenVal = screenVal.substring(0, screenVal.length - 1 );
		}
	}
});


