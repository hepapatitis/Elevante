
	var browser_height = $(window).height();
	var section_height, height_difference;
		
	// Section Auto Height
	function adjust_section()
	{
		$(".auto-height").each(function() {
			$(this).css("padding-top", 0);
			$(this).css("padding-bottom", 0);
			
			browser_height = $(window).height();
			section_height = $(this).height();
			height_difference = browser_height - section_height;
			
			if(height_difference > 0) {
				$(this).css("margin", 0);
				$(this).css("padding-top", height_difference/2);
				$(this).css("padding-bottom", height_difference/2);
			}
			else
			{
				$(this).css("padding-top", 35);
				$(this).css("padding-bottom", 35);
			}
		});
	}

	$(document).ready(function() {
		// Auto Adjust Height
		adjust_section();
		
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
