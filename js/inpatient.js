$(document).ready(function(){
		
	var first_name = window.localStorage.getItem("personnel_fname");
	$( ".header-right span.name" ).html( 'Welcome '+first_name);
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
	//$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	var personnel_id = window.localStorage.getItem("personnel_id");
	
	service.get_patient_card_details(visit_id, personnel_id).done(function (employees) 
	{
		//console.log(employees);
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			$( "#patient_card" ).html( data.result );
			//$( "#loader-wrapper" ).addClass( "display_none" );
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


//Add nurse notes
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
		
		var personnel_id = window.localStorage.getItem("personnel_id");
		var visit_id = getURLParameter("id");
		//get form values
		var date = $("input[name=date]").val();
		var time = $("input[name=time]").val();
		var signature = $("input[name=output]").val();
		var nurse_notes = $("textarea[name=nurse_notes]").val();
		
		service.save_nurse_notes(date, time, signature, nurse_notes, visit_id, personnel_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.result == "success")
			{
				$("#nurse_notes_section").html(data.message);
			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
			tinymce.init({
                selector: ".cleditor"
            });
			$('#canvas_form')[0].reset();
        });
	}
	
	else
	{
		$("#login_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//Edit nurse notes
$(document).on("submit","form#edit_nurse_notes",function(e)
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
		var notes_id = $(this).attr('notes_id');
		var personnel_id = window.localStorage.getItem("personnel_id");
		var visit_id = getURLParameter("id");
		//get form values
		var date = $("input[name=date"+notes_id+"]").val();
		var time = $("input[name=time"+notes_id+"]").val();
		var nurse_notes = $("textarea[name=nurse_notes"+notes_id+"]").val();
		//var notes_id = $("input[name=notes_id]").val();
		
		service.edit_nurse_notes(date, time, nurse_notes, visit_id, personnel_id, notes_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.result == "success")
			{
				$("#nurse_notes_section").html(data.message);
				tinymce.init({
					selector: ".cleditor"
				});
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

function delete_nurse_notes(visit_id, personnel_id, notes_id)
{
	var conf = confirm('Are you sure you want to delete this note?');
	
	if(conf)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		service.delete_nurse_notes(visit_id, personnel_id, notes_id).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.result == "success")
			{
				$("#nurse_notes_section").html(data.message);
				tinymce.init({
					selector: ".cleditor"
				});
			}
			else
			{
				$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
}