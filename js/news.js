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


var EmployeeNewsService = function() {

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

    this.getallLatesNews = function() {
		var request = url + "news/get_icpak_news" ;
        return $.ajax({url: request});
    }
    this.getNewsDetail = function(id) {
		var request = url + "news/get_news_detail" ;
        return $.ajax({url: url + "news/get_news_detail/" + id});
    }


}

//on page load if the user has logged in previously,
//log them in automatically
$(document).ready(function(){
	//automatic_login();
});

function get_news_items()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getallLatesNews().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#icpak_news" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			window.localStorage.setItem("news_history", data.result);
			window.localStorage.setItem("total_news", data.total_received);
		}
		
		else
		{

		}
	});
}


function get_news_description(id)
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new EmployeeNewsService();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	// var id = getURLParameter('id');
	// alert(id);
	
	service.getNewsDetail(id).done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#patient_card" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
			
		}
		
		else
		{

		}
	});
}

//pass the variable in the link as follows e.g. news.html?id=1
//on the news.html page get the parameter by javascript as follows var id = getURLParameter('id');
//the function to get the url parameter is defined below
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}




