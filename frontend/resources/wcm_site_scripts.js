
function openInSameWindow(url)
{
	window.location.href = url;
}

// function to change the display when pressing the navigation in home page top banner
function hpTopBannerNav_changeSelected(selectedId)
{
	// Show the selected content
	var selectedContent = $('.hp_topBanner_container[id*="'+selectedId+'"]');
	var allContents = $(".hp_topBanner_container");

	allContents.removeClass("active");
	selectedContent.addClass("active");
	
	// Mark the selected nav item
	var selectedNavItem = $("#"+selectedId);
	var allNavItems = $(".hp_topBanner_nav_li");
	//selectedContent.find(".hp_topBanner_content").append($(".hp_topBanner_contentNav"));
	allNavItems.removeClass("active");
	selectedNavItem.addClass("active");
} 

// function to change to selected category in QandA
function doDisplayCategory(selected)
{
	location=selected;
}

// function to show or hide an answer
function doToggleDisplayFaqAnswer(index)
{
	// show/hide the answer
	$('#faq_answer_'+index).toggle();
	// show/hide the "closed" image
	$('#question_close_img_'+index).toggle();
	// show/hide the "opened" image
	$('#question_open_img_'+index).toggle();
	
	// change "question" element's title
	var fixedTitle = "";
	var elementTitle = $('#faq_question_'+index).prop('title');
	// if "open" change to "close"
	if(elementTitle.indexOf('\u05E4\u05EA\u05D7')==0)
		fixedTitle = elementTitle.replace('\u05E4\u05EA\u05D7', '\u05E1\u05D2\u05D5\u05E8');
	// if "close" change to "open"
	else
		fixedTitle = elementTitle.replace('\u05E1\u05D2\u05D5\u05E8', '\u05E4\u05EA\u05D7');
	
	// set title
	$('#faq_question_'+index).prop('title',fixedTitle);	
}

// function to show or hide all answers
function doToggleDisplayAllFAQs()
{
	var fixedTitleAndText = "";
	var fixedTitle = "";
	var elementTitleAndText = $('#openAndCloseAllFAQs').prop('title');
	var elementTitle = "";
	
	// if "open all" 
	if(elementTitleAndText.indexOf('\u05E4\u05EA\u05D7')==0)
	{
		// change title
		fixedTitleAndText = elementTitleAndText.replace('\u05E4\u05EA\u05D7', '\u05E1\u05D2\u05D5\u05E8');
		// show all answers
		$('[id^=faq_answer_]').show();
		// hide all "closed" images
		$('[id^=question_close_img_]').hide();
		// show all "opened" images
		$('[id^=question_open_img_]').show();
		
		$('[id^=faq_question_]').each(function()
											{
												elementTitle = $(this).prop('title');
												// if "open" change to "close"
												if(elementTitle.indexOf('\u05E4\u05EA\u05D7')==0)
												{
													fixedTitle = elementTitle.replace('\u05E4\u05EA\u05D7', '\u05E1\u05D2\u05D5\u05E8');
													// set title
													$(this).prop('title', fixedTitle);
												}
											});
	}
	
	// if "close all"
	else
	{
		// change title
		fixedTitleAndText = elementTitleAndText.replace('\u05E1\u05D2\u05D5\u05E8', '\u05E4\u05EA\u05D7');	
		// hide all answers
		$('[id^=faq_answer_]').hide();
		// hide all "opened" images
		$('[id^=question_open_img_]').hide();
		// show all "closed" images
		$('[id^=question_close_img_]').show();

		$('[id^=faq_question_]').each(function()
											{
												elementTitle = $(this).prop('title');
												// if "clode" change to "open"
												if(elementTitle.indexOf('\u05E1\u05D2\u05D5\u05E8')==0)
												{
													fixedTitle = elementTitle.replace('\u05E1\u05D2\u05D5\u05E8', '\u05E4\u05EA\u05D7');
													// set title
													$(this).prop('title', fixedTitle);
												}
											});		
	}
	
	// set title
	$('#openAndCloseAllFAQs').prop('title',fixedTitleAndText);
	// set text
	$('#openAndCloseAllFAQs').html(fixedTitleAndText);
}

// function to show or hide a job details
function doToggleDisplayJobDetails(index)
{
	// show/hide the job
	$('#job_details_'+index).slideToggle();
	// show/hide the "closed" image
	$('#job_close_img_'+index).toggle();
	// show/hide the "opened" image
	$('#job_open_img_'+index).toggle();
	
	// change "job" element's title
	var fixedTitle = "";
	var elementTitle = $('#job_'+index).prop('title');
	// if "open" change to "close"
	if(elementTitle.indexOf('\u05E4\u05EA\u05D7')==0)
		fixedTitle = elementTitle.replace('\u05E4\u05EA\u05D7', '\u05E1\u05D2\u05D5\u05E8');
	// if "close" change to "open"
	else
		fixedTitle = elementTitle.replace('\u05E1\u05D2\u05D5\u05E8', '\u05E4\u05EA\u05D7');
	
	// set title
	$('#job_'+index).prop('title',fixedTitle);	
}


