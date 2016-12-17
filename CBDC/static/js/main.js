// Cookies.set('shopping', cart, { expires: 30 });
$( document ).ready( function () {
    $('.carousel.carousel-slider').carousel({full_width: true});

   	let cart = []

	$('.addtocart').click( function (e) {
		console.log()
		cart.push($($(this).prevAll('.brand')[0]).text())
		cart.push($($(this).prevAll('.product')[0]).text())
		cart.push($($(this).prevAll('.price')[0]).text())
		console.log(cart)
	})
});


// $($(this).prevAll('.product')[0]).text()


