/* Function to check for network connectivity */

function is_connected()
{
	navigator.network.isReachable(base_url, function(status) {
		var connectivity = (status.internetConnectionStatus || status.code || status);
		if (connectivity === NetworkStatus.NOT_REACHABLE) {
			return false;
			//alert("No internet connection - we won't be able to show you any maps");
		} else {
			return true;
			//alert("We can reach Google - get ready for some awesome maps!");
		}
	});
}

var EmployeeService = function() {

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

    this.findByName = function() {
		var request = url + "events/get_icpak_events" ;
        return $.ajax({url: request});
    }

    this.get_event_user = function() {
		var request = url + "login/get_logged_in_member" ;
        return $.ajax({url: request});
    }
    this.getEventsDetail = function(id) {
		var request = url + "events/get_news_detail" ;
        return $.ajax({url: url + "events/get_event_detail/" + id});
    }

    
}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
});

function get_event_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.findByName().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#events_list" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}

//get a logged in user's details
function get_event_user()
{
	var service = new EmployeeService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var first_name = data.first_name;
		var email = data.email;
		var member_id = data.member_id;
	});
}


function get_events_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getEventsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#events_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}