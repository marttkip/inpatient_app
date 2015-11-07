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


var EmployeeresourcesService = function() {

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

    this.getallLatesresources = function() {
		var request = url + "resources/get_icpak_resources" ;
        return $.ajax({url: request});
    }
    this.getresourcesDetail = function(id) {
		var request = url + "resources/get_resources_detail" ;
        return $.ajax({url: url + "resources/get_resources_detail/" + id});
    }


}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_resources_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeresourcesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallLatesresources().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#resources-of-icpak" ).addClass( "display_block" );
			$( "#icpak_resources" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{

		}
	});
}


function get_resources_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeresourcesService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getresourcesDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#resources-of-icpak" ).addClass( "display_block" );
			$( "#resources_detail" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );

		}
		
		else
		{

		}
	});
}

//pass the variable in the link as follows e.g. resources.html?id=1
//on the resources.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below





