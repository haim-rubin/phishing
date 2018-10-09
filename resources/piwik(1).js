window.onload = function() {
	//click on sidebar links
	$( ".fibi_main_menu li a , #rightsideBar li a , #additionalTools li a" ).click(function(event) {
		event.preventDefault();
		var link = "";
		var name = "";
		link = $(this).attr('href');
		name = $(this).find("span").text();  
		//check if the link is an external link
		try {
			if (link.indexOf("https") >= 0 || link.indexOf("http") >= 0 || link.indexOf("openPopupWindow") >=0 || link.indexOf("matafTools") >=0 ){
				if (link.indexOf("matafTools") >=0){
					name = $(this).attr('title');
				}
				if (name != undefined && name != "" && link != undefined && link != "" && $("#campaignManagerSugBaka").val() != undefined && $("#campaignManagerSugBaka").val() != "" )
					_paq.push(['trackEvent', "sugBaka_"+$("#campaignManagerSugBaka").val(), name, link]);
			}
		} catch(err){
		}
		finally {
			// Block of code to be executed regardless of the try / catch result
			window.location = $(this).attr('href');
		}
	}); 

	$( "input:not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]), select" ).blur(function(evt) {
		var target = $(evt.target);    
		if ($("#campaignManagerSugBaka").val() !== undefined){
			var value = "";
			var name = "";
			if (!target.parents('.fibi_topnav_upper').length > 0 || !target.parents('.right_sidebar').length > 0 || !target.parents('.fibi_main_menu').length > 0  || !target.parents('.fibi_bottom_links').length > 0) {
				try{
					name = this.name;
					 value = this.value;
					if (name == "" || name == undefined){
						name = this.value;
					}
					if (evt.target.tagName.toLowerCase() == "select"){
						value = $("option[value="+value+"]").text().trim();
					}
					_paq.push(['trackEvent', "sugBaka_"+$("#campaignManagerSugBaka").val(), name, value]);
				}catch(err){
					
				}
			}
			
		}
	});
	
}

