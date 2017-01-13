// Cookies.set('shopping', cart, { expires: 30 });
$( document ).ready( function () {
    $('.carousel.carousel-slider').carousel({full_width: true});

   	let cart = []

	$('.addtocart').click( function () {
		console.log()
		cart.push($($(this).prevAll('.brand')[0]).text())
		cart.push($($(this).prevAll('.product')[0]).text())
		cart.push($($(this).prevAll('.price')[0]).text())
		console.log(cart)
	})

	$('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15 // Creates a dropdown of 15 years to control year
	});


    $('select').material_select();
});




