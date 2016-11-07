

$(document).ready(function() {

// edit 
// limit requests 
let now = new Date().getTime()
    
	$('#searchbutton').click(function(e) {
		e.preventDefault()
		let entry = $('#input').val()
		if (new Date().getTime() - now > 300) {
		$.post('/search', {query: entry}, function(response,status){
			$('#searched-data').empty()
			for (var i = 0; i < response.length; i++) {
				$('#searched-data').append('<p>Username: ' + response[i].userName + '</p>' + '<p> First name: '+ response[i].firstName + '</p>' + '<p> Last Name: ' + response[i].lastName + '</p>' +  '<p> Email: ' + response[i].email + '</p>')
			}//end of for
		}) // end of post
		now = new Date().getTime()
	} // end of click
})



	$("#input").keyup(function(){
		let entry = $('#input').val()
		if (new Date().getTime() - now > 300) { 
		$.post('/search', {query: entry}, function(response,status){
			$("#json-datalist").empty()
			for (var i = 0; i < response.length; i++){
				$("#json-datalist").append('<option>' + response[i].userName + '</option>')

			}
		
		})
		now = new Date().getTime()
		}
	})	


})	





