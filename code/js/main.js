$(document).ready(function() {
	// Easing for #hashtags
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			
			if (target.length) {
				$('html,body').animate({scrollTop: target.offset().top}, 1500, 'easeInOutQuint');
				return false;
			}
		}
	});
	
	// Magnific Popup
	$('.magnific-popup').magnificPopup({
		gallery: {
			enabled: true
		},
		mainClass: 'mfp-fade',
		type:'image'
	});
	
    $('#contact-form').validate({
        rules: {
          name: {
            minlength: 2,
            required: true
          },
          subject: {
            minlength: 2,
            required: true
          },
          email: {
            required: true,
            email: true
          },
          message: {
            minlength: 2,
            required: true
          }
        },
        highlight: function(element) {
          $(element)
          .closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
          element
          .text('OK').addClass('valid')
          .closest('.form-group').removeClass('error').addClass('success');
        }
    });
	
	$('#contact-form').submit(function () {
		
		if($('#contact-form').valid())
		{
			var action = $(this).attr('action');
			
			$('#contact-message-container').slideUp(750);
			
			console.log("Tada");
			$.post(action, {
					name: $('#name').val(),
					email: $('#email').val(),
					subject: $('#subject').val(),
					message: $('#message').val()
				},
				function (data) {
					$('#contact-message').html(data);
					$('#contact-message-container').slideDown('slow');
					
					if (data.match('success') != null)
					{
						$('#name').val("");
						$('#email').val("");
						$('#subject').val("");
						$('#message').val("");
					}
					console.log(data);
				}
			)
			.error(function (data) {
				$('#contact-message').html(data);
				$('#contact-message-container').slideDown('slow');
			});
		}

		return false;

	});
});