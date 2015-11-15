// JavaScript Document

//log them in automatically
$(document).ready(function(){
	//localStorage.clear();
	automatic_login();
});


//automatic login
function automatic_login()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	var service = new Login_service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get member's credentials
	var username = window.localStorage.getItem("personnel_username");
	var password = window.localStorage.getItem("personnel_password");
	
	service.login_member(username, password).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			console.log(data.result);
			var first_name = data.result.personnel_fname;
			var personnel_id = data.result.personnel_id;
			$( "span.name" ).html( 'Welcome '+first_name);
			
			window.localStorage.setItem("personnel_fname", first_name);
			window.localStorage.setItem("personnel_id", personnel_id);
			window.localStorage.setItem("personnel_username", username);
			window.localStorage.setItem("personnel_password", password);
			//window.location.href = "home.html";
		}
		else
		{
			$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
		}
		
		$( "#loader-wrapper" ).addClass( "display_none" );
	});
}