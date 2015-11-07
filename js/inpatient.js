$(document).ready(function(){
		
	$("span[id=user_pass]").val("user");
	$( ".main-nav ul li#pro_social" ).css( "display", 'none' );
	$( ".main-nav ul li#profile" ).css( "display", 'none' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'none' );
	$( ".user-nav ul li#my_account" ).css( "display", 'none' );

	var visit_id = getURLParameter("id");
	get_patient_card_items(visit_id);
	
});


function get_patient_card_items(visit_id)
{
	// window.alert("dasdasda"+visit_id);
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	 
	
	service.get_patient_card_details(visit_id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#patient_card" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			// window.localStorage.setItem("patient_card", data.result);
		}
		
		else
		{

		}
	});
}


function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}