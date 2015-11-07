// JavaScript Document

//log them in automatically
$(document).ready(function(){
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
			//display login items
			service.get_member_details(username).done(function (employees) {
			var data_two = jQuery.parseJSON(employees);
			var first_name = data_two.member_first_name;
			$( "#user_logged_in" ).html( '<h4>Welcome back '+first_name+'</h4>' );
			});
			window.location.href = "home.html";
		}
		else
		{
			$("#login_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");
		}
		
		$( "#loader-wrapper" ).addClass( "display_none" );
	});
}