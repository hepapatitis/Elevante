function change_contact_form(x)
{
	if(x == 0)
	{
		$('#contact-default').attr("disabled", "disabled");
		$('#contact-inverse').removeAttr("disabled");
		
		$('#contact').removeClass('white');
		$('#contact .iForm').removeClass('inverse');
	}
	else
	{
		$('#contact-inverse').attr("disabled", "disabled");
		$('#contact-default').removeAttr("disabled");
		
		$('#contact').addClass('white');
		$('#contact .iForm').addClass('inverse');
	}
}