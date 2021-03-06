//login & registration functions
var Login_service = function() {

    var url;

    this.initialize = function(serviceURL) {
        url = serviceURL ? serviceURL : base_url;
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred.promise();
    }

    this.findById = function(id) {
        return $.ajax({url: url + "/" + id});
    }
	
	this.edit_nurse_notes = function(date, time, nurse_notes, visit_id, personnel_id, notes_id) {
		var request = url + "inpatient/edit_nurse_notes/"+visit_id+"/"+personnel_id+"/"+notes_id;
        return $.ajax({type:'POST', url: request, data:{date: date, time: time, nurse_notes: nurse_notes}});
    }
	
	this.delete_nurse_notes = function(visit_id, personnel_id, notes_id) {
		var request = url + "inpatient/delete_nurse_notes/"+visit_id+"/"+personnel_id+"/"+notes_id;
        return $.ajax({type:'POST', url: request});
    }
	
	this.save_nurse_notes = function(date, time, signature, nurse_notes, visit_id, personnel_id) {
		var request = url + "inpatient/save_nurse_notes/"+visit_id+"/"+personnel_id;
        return $.ajax({type:'POST', url: request, data:{date: date, time: time, signature: signature, nurse_notes: nurse_notes}});
    }
   
    this.login_member = function(personnel_username, personnel_password) {
		var request = url + "inpatient/login_member";
        return $.ajax({type:'POST', url: request, data:{personnel_username: personnel_username, personnel_password: personnel_password}});
    }
    this.get_member_details = function(member_no){
    	var request = url + "login/get_member_information/" + member_no;
        return $.ajax({url: request});
    }
    this.getProfileDetails = function() {
		var request = url + "login/get_client_profile";
        return $.ajax({url: request});
    }

    this.get_patient_list = function(){
    	var request = url + "inpatient/get_inpatient_list";
        return $.ajax({url: request});
    }
    this.get_patient_card_details = function(visit_id, personnel_id){
    	var request = url + "inpatient/get_inpatient_card/"+visit_id+"/a/1/"+personnel_id;
        return $.ajax({url: request});
    }
    
    this.search_transactions = function(visit_type_id,visit_date_from,visit_date_to,branch_code){
    	var request = url + "reports/search_transactions/"+visit_type_id+"/"+personnel_id+"/"+visit_date_from+"/"+visit_date_to+"/"+branch_code;

        return $.ajax({url: request});
	}
}

$(document).ready(function(){
	tinymce.init({
		selector: "#text_editor"
	});
	
})

/* Function to check for network connectivity */
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() 
{
    cordova.plugins.backgroundMode.setDefaults({ title:'Inpatients', text:'Inpatients', silent: true});
    
    //check if background action is enabled
    var enabled = cordova.plugins.backgroundMode.isEnabled();
    if(enabled === false)
    {
        // Enable background mode
        cordova.plugins.backgroundMode.enable();
    }

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        
        //clear other timeouts
        //clearTimeout(all_message_timeout);
        //clearTimeout(single_message_timeout);
        
    };
    
    cordova.plugins.backgroundMode.onfailure = function(errorCode) {
        cordova.plugins.backgroundMode.configure({
                        text:errorCode
                    });        
    };
}

//on page load if the user has logged in previously,
//log them in automatically


function get_profile_details()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	
	service.getProfileDetails().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#my_profile" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}

//Login member
$(document).on("submit","form#login_member",function(e)
{
	e.preventDefault();
	$("#login_response").html('').fadeIn( "slow");
	$("#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Login_service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		//get form values
		var username = $("input[name=personnel_username]").val();
		var password = $("input[name=personnel_password]").val();
		
		service.login_member(username, password).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				var first_name = data.result.personnel_fname;
				var personnel_id = data.result.personnel_id;
				
				window.localStorage.setItem("personnel_fname", first_name);
				window.localStorage.setItem("personnel_id", personnel_id);
				window.localStorage.setItem("personnel_username", username);
				window.localStorage.setItem("personnel_password", password);
				window.location.href = "home.html";
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

function logout()
{
	localStorage.clear();
	window.location.href = "index.html";
}

//get a logged in user's details
function get_patient_list()
{
	var first_name = window.localStorage.getItem("personnel_fname");
	$( ".header-right span.name" ).html( 'Welcome '+first_name);
	
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
		service.get_patient_list().done(function (employees) {
			
		var data = jQuery.parseJSON(employees);

		$("#patient_list").html(data).fadeIn( "slow");

		//initialize datepicker
		(function( $ ) {

			'use strict';

			if ( $.isFunction($.fn[ 'datepicker' ]) ) {

				$(function() {
					$('[data-plugin-datepicker]').each(function() {
						var $this = $( this ),
							opts = {};

						var pluginOptions = $this.data('plugin-options');
						if (pluginOptions)
							opts = pluginOptions;

						$this.themePluginDatePicker(opts);
					});
				});

			}

		}).apply(this, [ jQuery ]);
		
	});
}





