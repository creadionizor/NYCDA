$(document).ready(function () {

	// Check if form is empty or not
	$('#submit').click(function(event) {
		if($('#email').val().trim().length === 0 || $('#password').val().trim().length === 0) {
			event.preventDefault();
			$('#error-message').html("Your username or password is empty.");
		}
	});


});