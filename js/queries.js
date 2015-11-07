//login & registration functions
var Query_Service = function() {

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

    this.post_technical_query = function(form_data) {
		var request = url + "queries/post_technical_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.post_standards_query = function(form_data) {
		var request = url + "queries/post_standards_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }

    this.post_streaming_query = function(form_data) {
		var request = url + "queries/post_streaming_query";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.post_contact_us = function(form_data) {
		var request = url + "queries/contact_us";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    
    this.post_social_forum = function(form_data) {
		var request = url + "queries/post_social_forum";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.getalllatestsocial = function() {
		var request = url + "queries/get_latest_social";
        return $.ajax({url: request});
    }

    this.getsessionquestionform = function() {
		var request = url + "queries/get_question_answer_form";
        return $.ajax({url: request});
    }
    this.post_session_question = function(form_data) {
		var request = url + "queries/post_session_question";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
    this.get_event_user = function() {
		var request = url + "login/get_logged_in_member" ;
        return $.ajax({url: request});
    }
    this.getsessionquestions = function() {
		var request = url + "queries/get_session_questions";
        return $.ajax({url: request});
    }
    this.post_feedback = function(form_data) {
		var request = url + "queries/post_feedback";
        return $.ajax({url: request, data: form_data, type: 'POST', processData: false,contentType: false});
    }
 
}
//on page load if the user has logged in previously,
//log them in automatically

$(document).ready(function(){
	//automatic_login();
	$( ".main-nav ul li#pro_social" ).css( "inline-block", 'none' );
	$( ".main-nav ul li#profile" ).css( "inline-block", 'none' );
	$( ".main-nav ul li#cpd_live" ).css( "inline-block", 'none' );
});

//Register member
$(document).on("submit","form#technical_query",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#technical_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_technical_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login
				window.localStorage.setItem("query_subject", $("input[name=query_subject]").val());
				window.localStorage.setItem("query_text", $("input[name=query_text]").val());
				$("#technical_response").html('<div class="alert alert-success center-align">'+"You have successfully posted a technical query, we will get in touch with you through email. Thank you"+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#technical_response").html('<div class="alert alert-danger center-align">'+"Something went wrong"+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#technical_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});



//standards query member
$(document).on("submit","form#standards_query_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#standards_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_standards_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				window.localStorage.setItem("standard_query_subject", $("input[name=standard_query_subject]").val());
				window.localStorage.setItem("standards_query_text", $("input[name=standards_query_text]").val());
				$("#standards_response").html('<div class="alert alert-success center-align">'+"You have successfully posted a query, we will get in touch with you through email. Thank you"+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#standards_response").html('<div class="alert alert-danger center-align">'+"Something went wrong"+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#standards_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//standards query member
$(document).on("submit","form#questionForm",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#streaming_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_streaming_query(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				window.localStorage.setItem("speakers_name", $("input[name=speakers_name]").val());
				window.localStorage.setItem("streaming_comment_description", $("input[name=streaming_comment_description]").val());
				$("#streaming_response").html('<div class="alert alert-success center-align">'+"You have successfully posted a query, we will get in touch with you through email. Thank you"+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#streaming_response").html('<div class="alert alert-danger center-align">'+"Something went wrong"+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#streaming_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});



//social forum query member
$(document).on("submit","form#social_forum_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#social_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	$( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	$( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_social_forum(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				$("#social_response").html('<div class="alert alert-success center-align">'+"Your comment has been submited."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#social_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#social_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	get_social_forum();
	return false;
});



//standards query member
$(document).on("submit","form#ContactFormHe",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#contact_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_contact_us(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				window.localStorage.setItem("name", $("input[name=name]").val());
				window.localStorage.setItem("email", $("input[name=email]").val());
				window.localStorage.setItem("message", $("input[name=message]").val());
				$("#contact_response").html('<div class="alert alert-success center-align">'+"Thank you for contact us, we will address your issue and get back to you shortly."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#contact_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#contact_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	return false;
});


//get a logged in user's details
function get_event_user()
{
	var service = new Query_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.get_event_user().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		var first_name = data.first_name;
		var email = data.email;
		var member_id = data.member_id;
		$("#member_id").val(member_id);
		$("#member_email").val(email);
		$("#first_name").val(first_name);
	});
}



// social forum 

function get_social_forum()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Query_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getalllatestsocial().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#forum-content" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{
			$( "#forum-content" ).html(" No one has made a comment yet");
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}


// social forum 

function get_question_answer_form()
{
	$( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Query_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getsessionquestionform().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#question_answer" ).html( data.result );
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{
			$( "#question_answer" ).html(" No one has made a comment yet");
			$( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
	 get_session_questions();
}



//social forum query member
$(document).on("submit","form#question_answer_form",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#session_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );

	// $( ".main-nav ul li#pro_social" ).css( "display", 'inline-block' );
	// $( ".main-nav ul li#profile" ).css( "display", 'inline-block' );
	// $( ".main-nav ul li#cpd_live" ).css( "display", 'inline-block' );

	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_session_question(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				$("#session_response").html('<div class="alert alert-success center-align">'+"Your comment has been submited."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#session_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#social_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	
	return false;
});


// session question forum 

function get_session_questions()
{
	// $( "#loader-wrapper" ).removeClass( "display_none" );
	var service = new Query_Service();
	service.initialize().done(function () {
		console.log("Service initialized");
	});
	
	//get client's credentials
	
	service.getsessionquestions().done(function (employees) {
		var data = jQuery.parseJSON(employees);
		
		if(data.message == "success")
		{
			// $( "#news-of-icpak" ).addClass( "display_block" );
			$( "#active_session_question" ).html( data.result );
			// $( "#loader-wrapper" ).addClass( "display_none" );
		}
		
		else
		{
			$( "#active_session_question" ).html(" No one has made a comment yet");
			// $( "#loader-wrapper" ).addClass( "display_none" );
		}
	});
}
function get_download(article_id,kb_download)
{
	window.open('http://www.icpak.com/download.php?a_id='+article_id+'&download='+kb_download, '_system', 'location=yes'); 'return false;';
}


//social forum query member
$(document).on("submit","form#FeedbackForm",function(e)
{
	e.preventDefault();
	
	//get form values
	var form_data = new FormData(this);
		
	$("#feedback_response").html('').fadeIn( "slow");
	$( "#loader-wrapper" ).removeClass( "display_none" );
	//check if there is a network connection
	var connection = true;//is_connected();
	
	if(connection === true)
	{
		var service = new Query_Service();
		service.initialize().done(function () {
			console.log("Service initialized");
		});
		
		
		service.post_feedback(form_data).done(function (employees) {
			var data = jQuery.parseJSON(employees);
			
			if(data.message == "success")
			{
				//set local variables for future auto login

				$("#feedback_response").html('<div class="alert alert-success center-align">'+"Your comment has been submited."+'</div>').fadeIn( "slow");
		
			}
			else
			{
				$("#feedback_response").html('<div class="alert alert-danger center-align">'+data.result+'</div>').fadeIn( "slow");

			}
			
			$( "#loader-wrapper" ).addClass( "display_none" );
        });
	}
	
	else
	{
		$("#feedback_response").html('<div class="alert alert-danger center-align">'+"No internet connection - please check your internet connection then try again"+'</div>').fadeIn( "slow");
		$( "#loader-wrapper" ).addClass( "display_none" );
	}
	get_social_forum();
	return false;
});