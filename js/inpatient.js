$(document).ready(function(){
		
	$("span[id=user_pass]").val("user");
	$( ".main-nav ul li#pro_social" ).css( "display", 'none' );
	$( ".main-nav ul li#profile" ).css( "display", 'none' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'none' );
	$( ".user-nav ul li#my_account" ).css( "display", 'none' );

	var visit_id = getURLParameter("id");
	get_patient_card_items(visit_id);
	
});
var $canvas,
onResize = function(event) {
	
  $canvas.attr({
	height: window.innerHeight,
	width: window.innerWidth
  });
};

function get_patient_card_items(visit_id)
{
	// window.alert("dasdasda"+visit_id);
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	 
	

	service.get_patient_card_details(visit_id).done(function (employees) 
	{
		//console.log(employees);
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#patient_card" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			tinymce.init({
                selector: ".cleditor"
            });
			$('.sigPad').signaturePad();
			//$('.sigPad').signaturePad();
			//$canvas = $('canvas');
			/*window.addEventListener('orientationchange', onResize, false);
			window.addEventListener('resize', onResize, false);
			onResize();*/
			
			/*$('.sigPad').signaturePad({
				drawOnly: true,
				defaultAction: 'drawIt',
				validateFields: false,
				lineWidth: 0,
				output: null,
				sigNav: null,
				name: null,
				typed: null,
				clear: 'a#clear',
				typeIt: null,
				drawIt: null,
				typeItDesc: null,
				drawItDesc: null
			});*/
		}
		
		else
		{

		}
	});
}


function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}


//Login member
$(document).on("submit","form#canvas_form",function(e)
{
	e.preventDefault();
	//$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		var visit_id = getURLParameter("id");
		//get form values
		var date = $("input[name=date]").val();
		var time = $("input[name=time]").val();
		var signature = $("input[name=output]").val();
		var nurse_notes = $("textarea[name=nurse_notes]").val();
		
		service.save_nurse_notes(date, time, signature, nurse_notes, visit_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.result == "success")
			{
				$("#nurse_notes_section").html(data.message);
				//display login items
				/*service.get_member_details(username).done(function (employees) {
				var data_two = jQuery.parseJSON(employees);
				var first_name = data_two.member_first_name;
				$( "#user_logged_in" ).html( '<h4>Welcome back '+first_name+'</h4>' );
				});
				
				window.localStorage.setItem("personnel_username", username);
				window.localStorage.setItem("personnel_password", password);
				window.location.href = "home.html";*/
			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});