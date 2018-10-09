var portfolioWin=null;
var optionsWin=null;
( function() 
	{
	var _initEvents=function(){
		$('body').click(function(event) {
			if(!activeMenuObj)
				return true;
			activeMenuObj.children("p").removeClass("active");
			activeMenuObj.children(".fibi_submenu_wrapper").hide();
			activeMenuObj=null;
		});
		if (typeof portalId === 'undefined' || portalId === null  ){
			portalId = "FIBIPORTAL";
		}
		var activeMenuObj=null;
		var activeSwitcher=false;
		var slideTime=600;
		if(portalId == 'UBANKPRTAL')
			slideTime=100;
		$('.fibi_main_menu li.menuparent').click(function(event){
			if(activeMenuObj && activeMenuObj.attr("class") == $(this).attr("class")){
				if(activeSwitcher){
					activeMenuObj.children(".fibi_submenu_wrapper").hide();
					activeMenuObj.children("p").removeClass("active");
					activeMenuObj.children("p").addClass("not_active");
					activeSwitcher=false;
				}else{
					activeMenuObj.children("p").removeClass("not_active");
					activeMenuObj.children(".fibi_submenu_wrapper").slideDown(slideTime);
					activeSwitcher=true;
				}		
			}else
			{
				$(this).siblings().children("p").each (function(){
					$(this).removeClass("active");
					$(this).addClass("not_active");
					$(this).attr('text-decoration','none');
				});
				$(this).siblings().children(".fibi_submenu_wrapper").hide();

				$(this).children("p").addClass("active");
				$(this).children("p").removeClass("not_active");
				$(this).children(".fibi_submenu_wrapper").slideDown(slideTime);
				activeMenuObj=$(this);
				activeSwitcher=true;
			}
			event.stopPropagation();
		});

		$(".fibi_username").focusin(function () {
			$(this).css("border", "1px solid #076dbb");
		});
		$(".fibi_username").focusout(function () {
			$(this).css("border", "1px solid #bbc9d1");
		});
		$(".fibi_password").focusin(function () {
			$(this).css("border", "1px solid #076dbb");
		});
		$(".fibi_password").focusout(function () {
			$(this).css("border", "1px solid #bbc9d1");
		});

		$(".fibi_login_wrapper .fibi_security a").click(function () {
			$(".fibi_login_wrapper .fibi_security").hide();
			$(".fibi_login_wrapper .fibi_security_img").show();
			return false;
		});

		$(".fibi_login_wrapper .fibi_security_img img").click(function () {
			$(".fibi_login_wrapper .fibi_security_img").hide();
			$(".fibi_login_wrapper .fibi_security").show();
			return false;
		});

		$(".fibi_stock_menubar li a").hover(
			function () {
				$(this).parent(".fibi_stock_menubar").css("background-position", "center bottom");
			},
			function () {
				$(this).parent(".fibi_stock_menubar").css("background-position", "center top");

			});

		$(".constant_header .sbOptions li a").filter(':first').css("border-top", "1px solid #c8ced0");

		$('.explain').hover(
			function() {
				$(this).find('.tooltip_wrapTBL').css("display", "table");
			},
			function() {
				$(this).find('.tooltip_wrapTBL').css("display", "none");
			}
		);

		/****** Lightbox ******/
		$(".black_overlay").height($(document).height());

		$(".lightbox_close").click(function () {
			document.getElementById('lightbox').style.visibility = 'hidden';
			document.getElementById('lightbox_fade').style.display = 'none';
		});

		$(".todays_orders .fibi_stock_name a.stock_name").click(function(){
			if ($("#lightbox").length > 0) {
				document.getElementById('lightbox').style.visibility = 'visible';
				document.getElementById('lightbox_fade').style.display = 'block';

				$(".welcome_close").click(function () {
					document.getElementById('lightbox').style.visibility = 'hidden';
					document.getElementById('lightbox_fade').style.display = 'none';
				});
			}
		});

		var divAlert = $("<div id='timerDiv' style='text-align:right;padding:10px;text-align:center;'></div>");
		$("body").append(divAlert);

		// $("#fibi_search_field")
		// .focus(function(){
		// $(this).css("color", "#075ca1");
		// if ($(this).val() == "הקלד מילות חיפוש") {
		// $(this).val("");
		// }
		// })
		// .blur(function(){
		// $(this).css("color", "#075ca1");
		// if ($(this).val() == "") {
		// $(this).val("הקלד מילות חיפוש");
		// }
		// });


		$(".datepicker").each(function(index){
			$(this).datepicker({
				showOtherMonths: true, 
				selectOtherMonths: true,
				beforeShow:function(input, cal) {$(input).css({"position": "relative","z-index": 800});},
				//onClose:function(date, obj) {$(this).css({"position": "relative","z-index": 0});},
				//onSelect:function(date, obj) {$(".myclass").children("label").eq(0).remove();}
				onClose:function(date, obj) {$(this).css({"position": "relative","z-index": 0}); if ($(this).value=""){$(this).prev('label.placeholder').show();}},
				onSelect:function(date, obj) {$(this).prev('label.placeholder').hide();}
				//onSelect:function(date, obj) {$(".myclass label.placeholder").css("display", "none");}
			}

			);
			$(this).attr('title','בחר תאריך');
			/*$(this).attr('readonly','true');*/
			/*$(this).datepicker($.datepicker.regional['he']);
	    	$(this).datepicker({ dateFormat:"dd/mm/yy" });*/
		});
		/********** validation filtering************/
		$(".numeric").numeric();
		$(".integer").numeric(false, function(){this.value = ""; this.focus(); });
		$(".positive").numeric({ negative: false }, function() { this.value = ""; this.focus(); });
		$(".positive_integer").numeric({ decimal: false, negative: false }, function() {this.value = ""; this.focus();});

		//$('.not_impl').each(function( ){$(this).attr('title','עדיין לא יושם');});

		Number.prototype.toFixedDown = function(digits) {
			var n = this - Math.pow(10, -digits)/2;
			n += n / Math.pow(2, 53); // added 1360765523: 17.56.toFixedDown(2) === "17.56"
			return n.toFixed(digits);
		};
		$( function() {
			$('.positive').keyup(function(){
				if($(this).val().indexOf('.')!=-1){         
					if($(this).val().split(".")[1].length > 2){                
						if( isNaN( parseFloat( this.value ) ) ) return;
						this.value = parseFloat(this.value).toFixedDown(2);
					}  
				}            
				return this; //for chaining
			});
		});

	};


	this.initEvents=_initEvents;
	window.fibiFunc=this;
	})();

( function() 
	{
	var resizeMenu=function (isBig){
		var mainMenu=$(".fibi_main_menu");
		var ulWidth=mainMenu.width();
		if(ulWidth == null || ulWidth == 0)
			return false;
		$(".fibi_submenu_container").width(ulWidth);
		var colSumWidth=0;
		$(".fibi_main_menu>li>p").each(function (i, obj){
			colSumWidth+=Math.ceil($(this).width() );
		});
		var divider=14.1;
		if(portalId == 'OTSARPRTAL')
			divider=divider=18.9;
		if(portalId == 'UBANKPRTAL')
			divider=divider=17.8;
		var padding= (ulWidth-colSumWidth)/divider;
		$(".fibi_submenu_wrapper").each(function (){
			$(this).css('width', ulWidth+'px');
		});

		$(".fibi_main_menu>li>p").each(function (i, obj){
			$(this).css('padding', '0 '+padding+'px');
		});
		mainMenu.css('visibility', 'visible');
		/*if($.isFunction(window.accessibleCallBack))
		{
			accessibleCallBack();
		}	*/

	};

	var _setActiveStyleSheet=function(styleName,isInit) {
		var i, a;
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
				a.disabled = true;
				if(a.getAttribute("title") == styleName) a.disabled = false;
			}
		}
		if(styleName == null ||  styleName == 'null' ||(styleName.indexOf('main') >= 0))
			resizeMenu(true);
		else
			resizeMenu(false);
		if(!isInit) {
			_createCookie("style", styleName, 365);
		}
	};


	function getPreferredStyleSheet() {
		var i, a;
		for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
			if(a.getAttribute("rel").indexOf("style") != -1
				&& a.getAttribute("rel").indexOf("alt") == -1
				&& a.getAttribute("title")
			) return a.getAttribute("title");
		}
		return null;
	}

	var _createCookie= function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};

	var _readCookie=function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};

	var _initStyle=function(){
		var cookie = _readCookie("style");
		var styleName = cookie ? cookie : getPreferredStyleSheet();
		if(styleName == "null"){
			styleName="main";
		}
		_setActiveStyleSheet(styleName, true);
		initFooter();
	};

	function initFooter(){
		if( $("#bottom_nav").length > 0 ||  $("#fibi_rates_stocks").length > 0){
			$(".lotusMain").css("padding-bottom",'0px');	
			$("#fibi_footer").css('background-position','0 -4px');	
			$("#fibi_footer .fibi_footer_logo").css('padding-top','0px');	
		}
	};
	this.setActiveStyleSheet=_setActiveStyleSheet;
	this.readCookie=_readCookie;
	this.createCookie=_createCookie;
	this.initStyle=_initStyle;
	window.fibiStyleSwitch=this;

	})();
//****** Print Functions**************************************
( function() 
	{
	var  _processPrint=function(className, sugbaka, isajax){
		//debugger;
		if (document.getElementById != null){


			var html ='<!DO'+'CTYPE html PUBLIC "-//W3C//DTD XH'+'TML 4.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n'; 
			html +='<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">\n<HEAD>\n';
			html +="<link href='"+appPath+"css/reset.css'  rel='styleSheet' type='text/css'/>\n";
			if (jsisSnifit ==true){
				html +="<!--[if !IE]>-->\n";
				html +="<link href='"+appPath+"css/main.css' media='screen,print'  rel='stylesheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/fibiPrint.css' media='screen, print'   rel='stylesheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/fibiMediaPrint.css' media='print'  rel='stylesheet' type='text/css' />\n";
				html +="<!-- <![endif]-->\n";
				html +="<!--[if IE]>\n";
				html +="<link href='"+appPath+"css/main.css' media='screen'  rel='stylesheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/fibiPrint.css' rel='stylesheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/ie9mediaprint.css' media='print' rel='stylesheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/fibiMediaPrint.css'  rel='styleSheet' type='text/css' media='print'/>\n";
				html +="<![endif]-->\n";
			}
			else {
				html +="<link href='"+appPath+"css/main.css'  rel='styleSheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/fibiPrint.css'  rel='styleSheet' type='text/css'/>\n";
				html +="<link href='"+appPath+"css/fibiMediaPrint.css'  rel='styleSheet' type='text/css' media='print'/>\n";
				html +="<!--[if gt IE 7]>\n";
				html +="<link type='text/css' rel='stylesheet' media='all' href='"+appPath+"css/ie8up.css'/>\n";
				html +="<![endif]-->\n";
				html +="<!--[if IE 8]>\n";
				html +="<link type='text/css' rel='stylesheet' media='all' href='"+appPath+"css/ie8print.css'/>\n";
				html +="<![endif]-->\n";
				html +="<!--[if IE 9]>\n";
				html +="<link type='text/css' rel='stylesheet' media='all' href='"+appPath+"css/ie9print.css'/>\n";
				html +="<![endif]-->\n";
			}
			html += '<script language="javascript">';
			html += 'function printCurrentScreen(){var dive= window.document.getElementById("printCommand");';
			html += 'dive.style.display="none"; window.print(); dive.style.display="block";}';
			html += 'var portalId = "'+portalId+'";';
			html += 'function toggleFormElements(bDisabled) {';
			html += 'var inputs = document.getElementsByTagName("input");';
			html += 'for (var i = 0; i < inputs.length; i++) {';
			html += 'inputs[i].disabled = bDisabled;}';	
			html += 'var selects = document.getElementsByTagName("select");';
			html += 'for (var i = 0; i < selects.length; i++) {';
			html += 'selects[i].disabled = bDisabled;}';
			html += 'var textareas = document.getElementsByTagName("textarea");';
			html += 'for (var i = 0; i < textareas.length; i++) {';
			html += 'textareas[i].disabled = bDisabled;}';
			html += 'var buttons = document.getElementsByTagName("button");';
			html += 'for (var i = 0; i < buttons.length; i++) {';
			html += 'buttons[i].disabled = bDisabled;}';
			html += 'var ahref = document.getElementsByTagName("a");';
			html += 'for (var i = 0; i < ahref.length; i++) {';
			html += 'ahref[i].removeAttribute("href");}}';
			html += '</script>';
			if(portalId == 'PAGIPORTAL'){
				html += '\n</HE' + 'AD>\n<BODY style="text-align:center;width:800px;background-image:none;" class="print'+sugbaka+'" dir="rtl" onload="javascript:toggleFormElements(true)">';
				html += '<div id="wrapper" class="transactions" style="width:775px;text-align:right;margin:0 15px;">\n';
			}else if(portalId == 'OTSARPRTAL'){
				html += '\n</HE' + 'AD>\n<BODY style="text-align:center;width:800px;background-image:none;" class="print'+sugbaka+'" dir="rtl" onload="javascript:toggleFormElements(true)">';
				html += '<div id="wrapper" class="transactions" style="width:775px;text-align:right;margin:0 15px;">\n';
			}else if(portalId == 'UBANKPRTAL'){
				html += '\n</HE' + 'AD>\n<BODY style="text-align:center;min-width:855px;width:99%;background-image:none;" dir="rtl" class="uprintpreview print'+sugbaka+'" onload="javascript:toggleFormElements(true)">';
				html += '<div id="wrapper" class="transactions" style="text-align:right;">\n';
			}else{
				html += '\n</HE' + 'AD>\n<BODY style="text-align:center;min-width:800px;width:99%;background-image:none;" class="print'+sugbaka+'" dir="rtl" onload="javascript:toggleFormElements(true)">';
				html += '<div id="wrapper" class="transactions" style="text-align:right;">\n';
			}
			html += '<div style="margin:10px;text-align:center;">';
			html += '<div id="printCommand"><span id="closePrint" type="submit" class="fibi_submit_btn" style="margin:3px;" onclick="window.close();">סגור</span>';
			html += '<span id="printPrint" type="submit" value="" class="fibi_submit_btn" style="margin:3px;" onclick="window.print();">הדפס</span></div>';
			if(portalId == 'KUPOTPRTAL'){
				html += '<div>';
				html += '</div>';
			}else{
				html += '<div><img id="printLogo" src="'+appPathLogo+'images/common/logo_inversed.gif" class="flr">';
				html += '</div>';
			}
			html += '</div><div class="main_content inner flr full_width">\n';
			html+=getPrintingArea(className, sugbaka, isajax);
			html += '<div class="filter_form complex flr">\n';
			html += '<label class="simplelabel" style="padding:0 0 0 50px">\n';
			html += 'ט.ל.ח.\n';
			html += '\n</label>\n';
			html += '<label class="simplelabel">\n';
			html += 'נשמח לשרתך בכל עת. \n';
			html += '\n</label></div>\n';
			html += '\n</div></div>\n';
			html +='</BO'+'DY></HT'+'ML>';
			var printWin = window.open("","processPrint","left=0,top=0,directories=0,titlebar=0,toolbar=0,location=no,status=0,menubar=no,scrollbars=yes,resizable=yes,width=820px,height=800px;");
			printWin.document.open();
			printWin.document.write(html);
			printWin.document.close();
			printWin.focus();
			disableElementsForPrint(printWin);
//			printWin.print();
		}
	};
	function getPrintingArea(className, sugbaka, isajax) {
		var html="";
		if($.isFunction(window.getPrintHTMLCallback))
		{
			html=getPrintHTMLCallback(sugbaka);
		}else{
			$("."+className).each(function(index){
				html+=$(this).html();
				html+="</br>";
			});
		}
		return html;
	}
	var  _disableDocumentElements=function(winObj){
		disableElementsForPrint(winObj);
	};
	function disableInputs(){
		var obj=document.getElementsByTagName("input","button","select");
		for(var i=0; i < obj.length; i++)
		{
			obj[i].disabled='disabled';
		}
	}

	function disableHref(winObj){
		var tags=winObj.document.getElementsByTagName("a");
		for (var i=0; i < tags.length;i++ ){
			var nosave = tags[i].className;
			tags[i].removeAttribute('href');
			tags[i].removeAttribute('onClick');
			tags[i].removeAttribute('onclick');
			if(nosave.indexOf("nosave") == -1)
			{
				tags[i].removeAttribute('class');
			}
			tags[i].readOnly='true';
		}
	}

	function disableElementsForPrint(winObj){
//		console.log("disableElementsForPrint" );
		var obj=winObj.document.getElementById("additionalTools");
		if(obj)
			obj.style.visibility="hidden";
		disableHref(winObj);
		var tags=["input","button","select"];
		for (var i=0; i < tags.length;i++ ){
			var tagArr=winObj.document.getElementsByTagName(tags[i]);
			if(tagArr)
				for(var j=0; j < tagArr.length; j++)
				{
					if(tagArr[j].id=="printPrint" || tagArr[j].id=="closePrint" )
						continue;
					if((i==0 &&  (tagArr[j].type == "button" || tagArr[j].type == "submit")))
					{
						tagArr[j].style.visibility="hidden";
						continue;
					}

					try{
						tagArr[j].setAttribute('disabled', 'true'); 
						tagArr[j].removeAttribute('href');
						tagArr[j].removeAttribute('onClick');
						tagArr[j].removeAttribute('onclick');
						tagArr[j].readOnly='true';
					}catch(exception){}
				}
		}

	}

	function disableInputsJQ()
	{
		$(':input').each(function(index){$(this).attr('disabled','disabled');});
	}

	var  _processSaveAs=function(sugbaka,fileType,xslKey,useLastXml,custParams ){
		var url=serviceSrvlUrl;
		url+="?SUGBAKA="+sugbaka+"&ajaxAction=save&fileType="+fileType;
		if(xslKey && xslKey.length > 0){
			url+="&xslKey="+xslKey;
		}else xslKey ="";
		if(useLastXml && useLastXml.length > 0)
			url+='&useLastXml='+useLastXml; 
		else
			url+='&useLastXml=true';
				if(custParams){
					url+=custParams;
				}
		
		if (navigator.platform.toUpperCase().indexOf("MAC")>=0){
			//if true then append utf-8 for encode fix
			url+='&mac=true'; 
		}

		
		win= window.open(url,"SaveAs","");
		win.focus();     
	};

	var  _openCalc=function(){
		var url = appPath+"calc.html"; 
		w = window.open(url,"calculator","width=260,height=320,top=0,left=0");
		w.focus();
	};		
	var  _processHelp=function(helpId){
		var  url="http://www.fibi.co.il/helpsys/site/search.asp?sugbaka=";
		url+=helpId;
		url+="&lang="+currLang;
		var helpWin = window.open(url,"processHelp","left=0,top=0,directories=0,titlebar=0,toolbar=0,location=no,status=0,menubar=no,scrollbars=yes,resizable=yes,width=650px,height=450px");
		helpWin.focus();
	};		
	var  _processFavorite=function(){
		$('#isAddCurrentPageToPersonalNavigation').val('true');
		$('#personalNavigationCustomConfigForm').submit();
	};		

	this.processFavorite=_processFavorite;
	this.processHelp=_processHelp;
	this.processPrint=_processPrint;
	this.processSaveAs=_processSaveAs;
	this.disableDocumentElements=_disableDocumentElements;
	this.openCalc=_openCalc;
	window.matafTools=this;

	})();
//****** Util Functions**************************************
( function() 
	{
	var  _buildFormUrl=function(formName, actionUrl){
		obj = document.forms[formName];
		var getstr ="";
		if(actionUrl)
			getstr=actionUrl+"?";
		else
			getstr = obj.action+"?";
		var i;
		for (i=0; i < obj.elements.length; i++) {
			if (obj.elements[i].tagName == "INPUT") {
				if (obj.elements[i].type == "text" || obj.elements[i].type == "hidden" ) {
					getstr += obj.elements[i].name + "=" + obj.elements[i].value + "&";
				}
				if (obj.elements[i].type == "checkbox") {
					if (obj.elements[i].checked) {
						getstr += obj.elements[i].name + "=" + obj.elements[i].value + "&";
					} else {
						getstr += obj.elements[i].name + "&";
					}
				}
				if (obj.elements[i].type == "radio") {
					if (obj.elements[i].checked) {
						getstr += obj.elements[i].name + "=" + obj.elements[i].value + "&";
					}
				}
			}   
			if (obj.elements[i].tagName == "SELECT") {
				var sel = obj.elements[i];
				getstr += sel.name + "=" + sel.options[sel.selectedIndex].value + "&";
			}
			if (obj.elements[i].tagName == "TEXTAREA") {
				getstr += obj.elements[i].name + "=" + obj.elements[i].value + "&";
			}
		}
		//$.now()
		getstr+="tscache="+new Date().getTime()+ "&";
		return getstr;

	};
	var  _openChequeWin=function(formName,popupHandleHolder,urlAction){
		var prop="status=no,location=no,toolbar=no,width=820,height=780,scrollbars=yes,resizable=yes,top=0,left=0";
		var url=_buildFormUrl(formName,urlAction);
		if (popupHandleHolder==null) {
			popupHandleHolder = window.open(url,'check',prop);
		}
		else{
			popupHandleHolder.close();
			popupHandleHolder = window.open(url,'check',prop);
		}
		popupHandleHolder.focus();
		return popupHandleHolder;
	};
	var  _openChequeDialog=function(formName, divId){
		var url=_buildFormUrl(formName);
		var divObj=$("#"+divId);
		divObj.load(url);
		divObj.dialog({resizable: false,	width: 750 , height: 500});
	};

	var  _fibiSubmit=function(formName, formParams) {
		var form = document.forms[formName];
		if (!form) {
			_consoleLog("The form \"" + formName + "\" is not defined",true);
			return;
		}
		for (var param in formParams) {
			var formParam = form.elements[param];
			if (!formParam) {
				_consoleLog("The form param \"" + formParam + "\" is not defined",true);
				continue;
			}
			formParam.value = formParams[param];
		}
		form.submit();
	};
	var  _getInnerHtml=function(elmSelect, altHtml){
		var html="";
		var obj=$(elmSelect);
		if(obj.length > 0){
			html+=obj.html();
		}else{
			if(altHtml)
				html=altHtml;
		}
		return html;			
	};

	var  _consoleLog=function(msg, error) {
		if (typeof console != "undefined") {
			if(error == undefined)
				error=false;
			if(error)
				console.error(msg);
			else
				console.log(msg);
		} else {
			//alert(s);
		}
	};
	var  _divPopup=function divPopup(divId,title, width, height){
		var objDiv=$('#'+divId);
		objDiv.dialog(
			{	modal: true, 
				dialogClass: 'everdialog_2', 
				closeText: 'X',
				buttons: {"סגור": function() {$( this ).dialog( 'close'); }}
			}
		);
	};

	var  _scrollToElement=function scrollToElement(elementId){
		var obj=$("#"+elementId);
		if(obj.length > 0)
			$('html, body').animate({scrollTop: obj.offset().top}, 1000);
	};

	var  _openPopupWindow=function openPopupWindow(url, name){
		var prop="status=no,location=no,toolbar=no,width=900,height=650,scrollbars=yes,resizable=yes,top=0,left=0";
		if(url.indexOf("portfolio") > 0){
			portfolioWin=window.open(url, name, prop);
			portfolioWin.focus();
		}else if(url.indexOf("options") > 0){
			optionsWin=window.open(url, name, prop);
			optionsWin.focus();
		}else {
			popupWindow = window.open(url, name, prop);
			popupWindow.focus();
		}
	};

	this.openPopupWindow=_openPopupWindow;
	this.scrollToElement=_scrollToElement;
	this.buildFormUrl=_buildFormUrl;
	this.openChequeWin=_openChequeWin;
	this.openChequeDialog=_openChequeDialog;
	this.getInnerHtml=_getInnerHtml;
	this.fibiSubmit=_fibiSubmit;
	this.divPopup=_divPopup;
	this.consoleLog=_consoleLog;
	window.matafUtil=this;

	})();
//****** Table Functions**************************************
( function() 
	{
	var  _buildFixedHeadTable=function(tableName, maxWidth,maxHeight,sorted ){
		/* maxWidth - width of inner tab */
		var tblOrig=$('#'+tableName);
		if(tblOrig.length > 0 )
		{
			var tblParentVert=$(tblOrig.parent());
			var tblParentHrz=$(tblParentVert.parent());
			var tblHeight=tblOrig.height();
			var tblWidth=tblOrig.width();
			var scrollWidth=18;
			if(!maxHeight)
				maxHeight=465;
			if(!sorted)
				sorted=false;
			if($.browser.webkit){
				scrollWidth=15;
			}
			/*
 			if(os.isWin7){
			}
			if(os.isXP){
			}
			$.browser.mozilla
 			if($.browser.msie){
				scrollWidth=17;
			}*/
			if(tblWidth > maxWidth)
			{
				if(tblHeight < maxHeight)
				{
					tblParentHrz.css('height',tblHeight+4+"px");
					tblParentVert.css('height',tblHeight+2+"px");
				}
				tblParentVert.css('overflow-y','visible');
				tblParentHrz.css('overflow','auto');
				tblParentHrz.width(maxWidth);
				return false;
			}
			if	( tblHeight > tblParentVert.height())
			{
				tblParentHrz.css('overflow','hidden');
				tblParentHrz.css('height',maxHeight+'px');
				var divHeight=tblHeight-tblParentVert.height();
				if(divHeight < 33)
				{
					tblParentVert.css('height',maxHeight+'px');
					return true;

				}
				var trHeader=$('#'+tableName+ ' thead tr');
				var thHeadersObject=trHeader.children('th');

				var i=0;		
				var widthCols=new Array();
				thHeadersObject.each( 
					function()
					{
						$(this).attr("index",""+i);
						widthCols[i]=parseInt($(this).width());
						$(this).attr("width",widthCols[i++]+"px");
					}
				);
				tblParentVert.width(tblOrig.width()+scrollWidth+"px");
				proxyHeaderDiv=tblParentHrz.children('.div_tbl_proxyheader');
				proxyHeaderDiv.width(tblParentVert.width()+"px");
				var tableProxy= $('<table/>').addClass( tblOrig.attr('class'));
				tableProxy.append('<thead><tr id="'+tableName+'_tr_proxy">'+trHeader.html()+'</tr></thead>');
				proxyHeaderDiv.append(tableProxy);
				/*if($.browser.webkit){
					tblOrig.css("margin-right","-"+scrollWidth+"px");
				}*/
				trHeader.css("display","none");
				var count=widthCols.length;
				i=0;
				tblOrig.find('tbody>tr>td').each(function()
					{
					if(i < count)
					{
						$(this).attr('width', widthCols[i++]+'px');
					}
					});

				i=0;
				widthCols[widthCols.length-1]=widthCols[widthCols.length-1]+scrollWidth ;
				i=0;
				tableProxy.children('thead').children('tr').children('th').each(function()
					{
					$(this).attr('width', widthCols[i]+'px');
					$(this).click(function(event){
						thHeadersObject[parseInt($(this).attr('index'))].click();
					});
					i++;
					});
			}else{
				tblParentHrz.css('height',tblHeight+11+'px');
				tblParentVert.css('height',tblHeight+2+'px');
				tblParentVert.css('border-bottom','medium none');
				tblParentVert.css('overflow-y','hidden!important');
				tblParentHrz.css('overflow-y','hidden!important');
			}
		};
	};


	var  _buildHScrollTable=function(tableName, maxWidth,maxHeight){
		var tblOrig=$('#'+tableName);
		if(tblOrig.length > 0 )
		{
			var tblWidth=tblOrig.width();
			var tblParentHrz=$(tblOrig.parent());
			var tblHeight=tblOrig.height();
			if(!maxHeight)
				maxHeight=465;
			if(tblWidth > maxWidth)
			{
				tblParentHrz.width(maxWidth);
				if(tblHeight < maxHeight)
				{
					tblParentHrz.css('height',tblHeight+19+"px");
				}else{
					tblParentHrz.css('overflow','auto');
					tblOrig.css('height',tblHeight+19+"px");
				}

				return false;
			}else{
				if(tblHeight > maxHeight ){
					tblParentHrz.css('overflow','auto');
					tblOrig.css('height',tblHeight+19+"px");						
				}
			}


		}
	};
	var os = (function() {
		var ua = navigator.userAgent.toLowerCase();
		return {
			isWin2K: /windows nt 5.0/.test(ua),
			isXP: /windows nt 5.1/.test(ua),
			isVista: /windows nt 6.0/.test(ua),
			isWin7: /windows nt 6.1/.test(ua)
		};
	}());


	this.buildFixedHeadTable=_buildFixedHeadTable;
	this.buildHScrolledTable=_buildHScrollTable;
	window.matafTable=this;








	})();

//function fixedTableBuild(tblID){
//console.log("fixedTableBuild " + tblID);
//console.log($(""+tblID).width());
//console.log($(tblID).width());
//var bodyTR = $(tblID).find("tr:first-child");
//console.log("bodyTR.length "+bodyTR.length);


//$(tblID).find('td').each(function(index)
//console.log($(tblID[index]).width());
//);
//console.log($(tblID).find("tr:first-child td").width());

//}

//****** Date Functions**************************************
( function() 
	{
	var  _setDateFieldsById=function(idDatepicker,dateFormat, idDD,idMM,idYY){
		// dateFormat : 1- 3 fields mm dd yyyy, 2- 1 field mmddyyyy;
		try{
			var dateObj1 = $("#"+idDatepicker);
			if(dateObj1.length ==0)	return false;
			var dateVal=dateObj1.datepicker().val();
			if(dateVal.length > 0 && _validateDate(dateVal)){
				var splited=dateVal.split('/');
				if(dateFormat == 1){
					$("#"+idDD).val(splited[0]);
					$("#"+idMM).val(splited[1]);
					$("#"+idYY).val(splited[2]);
				}
				if(dateFormat == 2){
					$("#"+idDD).val(splited[0]+splited[1]+splited[2]);
				}
				return true;
			}else
			{
				return false;
			}
		}catch(exception){
			return false;
		}
	};

	var  _isDateEmptyById=function (dateFieldID){
		try{
			var dateObj1 = $("#"+dateFieldID);
			if(dateObj1.length==0)	return null;
			var dateVal=dateObj1.datepicker().val();
			if(dateVal=="//" || dateVal.length == 0)
				return  true;
			else
				return  false;
		}catch(exception){
			return null;
		}
	};

	var   _compareDatesPeriodById=function(dateFieldID1,dateFieldID2, msgErr){
		var ret=_compareDatesById(dateFieldID1,dateFieldID2);
		if(ret == 3){
			if(!msgErr){
				msgErr='טווח התאריכים שגוי';
			}
			dateErrorMsg(msgErr);
			return false;
		}
		return true;
	};

	var   _compareDatesById=function(dateFieldID1,dateFieldID2){
		try{
			var dateObj1 = $("#"+dateFieldID1);
			var dateObj2 = $("#"+dateFieldID2);
			if(dateObj1.length ==0 || dateObj2.length ==0 )
				return null;
			var dateVal1 = dateObj1.val();
			var dateVal2 = dateObj2.val();
			if(dateVal1.length < 10 || dateVal2.length < 10 )
				return null;
			var splited=dateVal1.split('/');
			var datenum1=parseFloat(splited[2]+splited[1]+splited[0]);
			splited=dateVal2.split('/');
			var datenum2=parseFloat(splited[2]+splited[1]+splited[0]);
			if (datenum1 < datenum2)
				return 1;  // less than
			else if (datenum1 == datenum2)
				return 2;  // equal
			else if (datenum1 > datenum2)
				return 3;  // greater than
			else
				return null;  // error
			return  dateVal1 <dateVal2;
		}catch(exception){
			return null;
		}
	};


	var   _validateDateById=function(dateFieldID, msgErr){
		try{
			var dateObj = $("#"+dateFieldID);
			if(dateObj.length == 0) return false;
			var dateVal=dateObj.datepicker().val();
			return  validateDate(dateVal, msgErr);
		}catch(exception){
			return false;
		}
	};

	var   _validateDateByName=function(dateFieldName, msgErr){
		var dateObj=$('[name='+dateFieldName+']');
		if(dateObj.length == 0) return false;
		var dateVal=dateObj.datepicker().val();
		return  validateDate(dateVal, msgErr);
	};

	var   _validateDate=function (dateStr, msgErr){
		if (dateStr == undefined || dateStr.length == 0)
		{
			dateErrorMsg(msgErr);
			return false;
		}
		var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
		var calRE = getFormattedDate("dd/mm/yyyy");
		if (calRE.test(dateStr) && RegExPattern.test(dateStr)){
			return true;
		}else{
			dateErrorMsg(msgErr);
			return false;
		}
	};

	function getFormattedDate(dateFormat) {
		dateFormat = dateFormat.replace(/\\/g, '\\\\');
		dateFormat = dateFormat.replace(/\//g, '\\\/');
		dateFormat = dateFormat.replace(/\[/g, '\\\[');
		dateFormat = dateFormat.replace(/\]/g, '\\\]');
		dateFormat = dateFormat.replace(/\(/g, '\\\(');
		dateFormat = dateFormat.replace(/\)/g, '\\\)');
		dateFormat = dateFormat.replace(/\{/g, '\\\{');
		dateFormat = dateFormat.replace(/\}/g, '\\\}');
		dateFormat = dateFormat.replace(/\</g, '\\\<');
		dateFormat = dateFormat.replace(/\>/g, '\\\>');
		dateFormat = dateFormat.replace(/\|/g, '\\\|');
		dateFormat = dateFormat.replace(/\*/g, '\\\*');
		dateFormat = dateFormat.replace(/\?/g, '\\\?');
		dateFormat = dateFormat.replace(/\+/g, '\\\+');
		dateFormat = dateFormat.replace(/\^/g, '\\\^');
		dateFormat = dateFormat.replace(/\$/g, '\\\$');
		dateFormat = dateFormat.replace(/dd/i, '\\d\\d');
		dateFormat = dateFormat.replace(/mm/i, '\\d\\d');
		dateFormat = dateFormat.replace(/yyyy/i, '\\d\\d\\d\\d');
		dateFormat = dateFormat.replace(/day/i, '\\w\\w\\w');
		dateFormat = dateFormat.replace(/mon/i, '\\w\\w\\w');
		return new RegExp(dateFormat);
	} ;

	function dateErrorMsg(msg){
		if(!msg)
			msg='תאריך אינו חוקי';
		$("<div style='text-align:right;'><div class='ERROR' style='width:60%; text-align:center;'>"+msg+"</div></div>").dialog(
			{	modal: true, 
				dialogClass: 'everdialog_2', 
				closeText: 'X',
				buttons: {"סגור": function() {$( this ).dialog( 'close'); }}
			}
		);
	};

	var   _setCurrentDateByName=function (dateFieldName_DD,dateFieldName_MM,dateFieldName_YYYY, datepickerFieldId){
		var dateField_DD=$('[name='+dateFieldName_DD+']');
		var dateField_MM=$('[name='+dateFieldName_MM+']');
		var dateField_YYYY=$('[name='+dateFieldName_YYYY+']');
		return setDateFields(dateField_DD,dateField_MM,dateField_YYYY,datepickerFieldId  );
	} ;

	var   _setCurrentDateById=function (dateFieldId_DD,dateFieldId_MM,dateFieldId_YYYY,datepickerFieldId){
		var dateField_DD=$('#'+dateFieldId_DD+']');
		var dateField_MM=$('#'+dateFieldId_MM+']');
		var dateField_YYYY=$('#'+dateFieldId_YYYY+']');
		return setDateFields(dateField_DD,dateField_MM,dateField_YYYY,datepickerFieldId  );
	};

	function setDateFields(dateField_DD,dateField_MM,dateField_YYYY,datepickerFieldId  ){
		if(dateField_DD.length == 0 || dateField_MM.length == 0 || dateField_YYYY.length == 0)
			return false; 
		var currDate = new Date(Date.parse(CurrDate));
		var currDD=currDate.getDate(); 
		var currMM=currDate.getMonth( )+1;
		var currYYYY=currDate.getFullYear( );
		if(parseInt(currDD) < 10) currDD='0'+currDD;
		if(parseInt(currMM) < 10) currMM='0'+currMM;
		dateField_DD.val(currDD);
		dateField_MM.val(currMM);
		dateField_YYYY.val(currYYYY);
		if(datepickerFieldId){
			var dateObj = $("#"+datepickerFieldId);
			if(dateObj.length > 0){
				dateObj.val(currDD+'/'+currMM+'/'+currYYYY); 
			}
		}
		return true;
	};

	this.isDateEmptyById=_isDateEmptyById;
	this.validateDateById=_validateDateById;
	this.validateDateByName=_validateDateByName;
	this.validateDate=_validateDate;
	this.setDateFieldsById=_setDateFieldsById;
	this.setCurrentDateByName=_setCurrentDateByName;
	this.setCurrentDateById=_setCurrentDateById;
	this.compareDatesById=_compareDatesById;
	this.compareDatesPeriodById=_compareDatesPeriodById;
	window.matafDate=this;
	})();

/***********Time out**********************/
( function() 
	{
	var autoLogoutTimer = null;
	var autoRefreshMrktTimer = null;
	var closeTimer = null;

	var _startBeforeClose=function  (isAutomaticLogoff){
		try{clearTimeout(autoLogoutTimer);}
		catch(e){}
		try{
			var MaxInactiveTimeInt=parseInt(MaxInactiveTime,"10");
			if(typeof isAutomaticLogoff!=="undefined" && isAutomaticLogoff=='true')
				autoLogoutTimer = setTimeout('matafTimeOut.logoutFromSite()',MaxInactiveTimeInt); 
			else
				autoLogoutTimer = setTimeout('matafTimeOut.showBeforeClose()',MaxInactiveTimeInt);

			/* var curr=new Date();
			 str=curr.getFullYear()+"."+(curr.getMonth()+1)+"."+curr.getDate()+"-"+
			 curr.getHours()+":"+ curr.getMinutes();
			 matafUtil.consoleLog("startBeforeClose-MaxInactiveTime="+MaxInactiveTimeInt+":startTime="+str); */
		}catch(e){	  
			autoLogoutTimer = setTimeout('matafTimeOut.showBeforeClose()',MaxInactiveTimeInt); 
		}
	};

	var _showBeforeClose=function showBeforeClose(){
		try{

			if(( portfolioWin != undefined && !portfolioWin.closed)
				|| (optionsWin != undefined && !optionsWin.closed))
			{
				refreshPage();
				return;
			}
			var idd=$(".ui-dialog-content").attr("id");
			$('#'+idd).dialog('destroy');
			/* var curr=new Date();
			 str=curr.getFullYear()+"."+(curr.getMonth()+1)+"."+curr.getDate()+"-"+
			 curr.getHours()+":"+ curr.getMinutes();
			 matafUtil.consoleLog("showBeforeClos-"+str); */
			$divMsg = $("#timerDiv");
			$divMsg.html("הינך עומד להתנתק <br> הקש\\י אישור להמשך פעילות <br/>").css({'color':"blue",'font': "bold 16px Arial"});
			$divMsg.dialog('destroy');
			$divMsg.dialog({
				open: function() {localStorage.clear();}, 
				position: { my: "center", at: "center", of: window },
				modal: 'true',
				resizable: 'false',
				width:  300,
				height: 200,
				dialogClass: 'everdialog_timer',
				closeText: 'X',
				buttons: {"אישור": function() {$( this ).dialog( 'close');clearTimeout(closeTimer);_startBeforeClose();refreshPage();}}
			});
			$(".ui-widget-overlay").removeClass("ui-widget-overlay").addClass("ui-widget-overlay-time");

			$divMsg.parent().find('.ui-dialog-titlebar').css('visibility','hidden');
			try{clearTimeout(closeTimer);}catch(e){}
			closeTimer = setTimeout( 'matafTimeOut.timeOver()',MaxMsgOnTime);
		}catch(e){	  
			_logoutFromSite();
		}


	};
	var _timeOver=function(){
		$("#timerDiv").dialog('destroy');
		fibiStyleSwitch.createCookie("timeOut","true",365);
		document.getElementById("matafLogoutLink").click();
	};

	function refreshPage(){
		var	objForm=$("#refreshPortletForm");
		if(objForm){
			var fld=document.refreshPortletForm.portal_current_account;
			if(fld){
				document.refreshPortletForm.PortletForm_ACTION_NAME.value='changeAccount';
				fld.value=$("#account_num_select  option:selected").val();;
				objForm.submit();
			}
		}
	}

	var _startTimeRefresh=function  (){
		try{clearTimeout(autoRefreshMrktTimer);}
		catch(e){}
		try{
			autoRefreshMrktTimer = setTimeout('matafTimeOut.refreshMrkt()',MaxInactiveTime); 
		}catch(e){	  
		}
	};

	var _refreshMrkt=function  (){
		location.reload(true);
	};
	var _logoutFromSite =function  (){
		fibiStyleSwitch.createCookie("timeOut","true",365);
		document.getElementById("matafLogoutLink").click();
	};

	this.refreshMrkt=_refreshMrkt;
	this.logoutFromSite=_logoutFromSite;
	this.timeOver=_timeOver;
	this.startTimeRefresh=_startTimeRefresh;
	this.showBeforeClose=_showBeforeClose;
	this.startBeforeClose=_startBeforeClose;
	window.matafTimeOut=this;

	})();
//Global vars

function submitRefreshMSCH(cmpObj)
{
	var valSelected=$("#account_num_select  option:selected").val();                    
//	debugger;
	if($.isFunction(window.refreshSubmitCallBack))
	{
		refreshSubmitCallBack();
	}	
	var	objForm=$("#refreshPortletForm");
	if(objForm){
		var fld=document.refreshPortletForm.portal_current_account;
		if(fld){
			document.refreshPortletForm.PortletForm_ACTION_NAME.value='changeAccount';
			fld.value=valSelected;
			objForm.submit();
		}
	}
	else{
		alert("refreshPortletForm not found");
	}
}
function submitRefreshZIHHEVR(cmpObj)
{
	var valSelected=$("#company_num_select  option:selected").val();                    
	var	objForm=$("#refreshPortletForm");
	if(objForm){
		var fld=document.refreshPortletForm.portal_company_tz;
		if(fld){
			document.refreshPortletForm.PortletForm_ACTION_NAME.value='changeCompanyTevel';
			fld.value=valSelected;
			objForm.submit();
		}
	}
	else{
		alert("refreshPortletForm not found");
	}
}
function submitFreeAccount()
{
	var branchFree=$("#branchFree").val();
	var accountFree=$("#accountFree").val();
	var urlSrvs = "/MatafServiceServlets/MatafChangeAccountServlet?actionName=changeAccount&branch="+branchFree+
	"&account="+accountFree+"&isShowAccList=false"+
	"&ts="+new Date().getTime(); 
	var fm=$("#fraccmsg");
	fm.css("display","none");
	try { 
		
		$.ajax({async: false,
			timeout: 3000,
			url: urlSrvs,
			success: function(str){ 
				if(str == "ok"){
					var	lawForm=$("#lawerForm");
					lawForm.submit();
				}else {
					fm.css("display","block");
				};
			},
			error:function(jqXHR, textStatus){ fm.css("display","block");}
		});
	}catch(e) {	}
}
function doDisplayCategory(selected)
{
	location=selected;
}

function logMsg(msg)
{
	//debugger;
	var request = $.ajax({
		type:"GET",
		url: serviceSrvlUrl,
		data: {ajaxAction:'logMsg', logMsg:msg},
		async: true
	});
	request.done(function(msg) {
		alert("msg sent");
	});

	request.fail(function(jqXHR, textStatus) {
		alert( "Request failed: " + textStatus );
	});
}

function open154()
{
	window.location.href="/wps/myportal/FibiMenu/Online/OnAccountMngment/OnChequeActions/OnChequeImages";
}	

if($.browser.msie){
	$(function () {
		setTimeout(function () { goToSecondTab(); }, 1000);
		function goToSecondTab() {
			//window.location.hash = '#fibi_main_header';
			window.scrollTo(0, 0);
		}
	});	
}


function refreshAnimate($this) {
	$($this).find("#wait").prev().addClass('animated');
}

function getScrollBarWidth() {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";
	inner.style.overflow = "visible";
	inner.style.display = "inline-block";

	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "300px";
	outer.style.left = "200px";
	//outer.style.visibility = "hidden";
	outer.style.zIndex = "-2222";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild (inner);

	document.body.appendChild (outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2) w2 = outer.clientWidth;

	document.body.removeChild (outer);

	return (w1 - w2);
};



//---fixedHeaderDynamicTable------------------------------

function fixedTableBuild(currTable, waitTime, maxHeight){ 
	restore(currTable);
	//console.log('fixedTableBuild');
	currTable.width('auto');
	currTable.hide();

	setTimeout(function(){
		var popup = false;
		if(maxHeight == undefined) {
			maxHeight = 536;
		}
		else {
			popup = true;
		}
		var ScrollBarWidth = getScrollBarWidth() ;
		var currTableWidth = currTable.width();
		var originalContainerWidth = currTable.parent().width();
		currTable.show();
		var originalContainerHeight = currTable.parent().height();
		var currTableHeight = currTable.height();

		// console.log('fixedTableBuild **** setTimeout');


		var horScroll = false;
		var	vertScroll = false;


		if(currTableHeight > maxHeight)
			vertScroll = true;	
		if((currTableWidth > originalContainerWidth && !vertScroll) || ((currTableWidth + ScrollBarWidth > originalContainerWidth) && vertScroll))
			horScroll = true;		


		if (!vertScroll && !horScroll)
		{
			// console.log('noScroll');
			currTable.width('100%');
		}
		else if  (vertScroll && !horScroll)
		{
			//console.log('only Vertical Scroll ');
			addVerticalScroll(currTable, originalContainerWidth, popup, maxHeight);
		}
		else if (!vertScroll && horScroll)
		{
			// console.log('only Horizontal Scroll ');
			addHorizontalScroll(currTable, originalContainerWidth);
		}
		else if  (vertScroll && horScroll)
		{
			// console.log('both scrolls');
			//addBothScrolls(currTable, originalContainerWidth);
			addBothScrolls(currTable, originalContainerWidth, popup, maxHeight );
		}

		currTable.show();
		$('.fixedHeaderDynamicTable').trigger('fixedHeaderDynamicTableREADY');
	},waitTime);

}

function addHorizontalScroll(currTable, originalContainerWidth){ 
	if(!currTable.parent().hasClass('tableWrapHorScroll')){
		// console.log('addHorizontalScroll()');
		currTable.wrap("<div class='tableWrapHorScroll'></div>");
		currTable.parent().width(originalContainerWidth);
	}
}

function addVerticalScroll(currTable, originalContainerWidth, popup, maxHeight ){ 
	var ScrollBarWidth = getScrollBarWidth() ;
	// console.log('ScrollBarWidth = ' +ScrollBarWidth);
	// console.log("addVerticalScroll");
	if(!currTable.parent().parent().hasClass('tableVertScroll_WRAP')){
		//if($('.tableVertScroll_WRAP').length == 0){
		currTable.wrap("<div class='tableVertScroll_WRAP'></div>"); 
		currTable.wrap("<div class='tableVert_tBody'></div>"); 
		if(popup){
			$('div.tableVert_tBody').height(maxHeight - 70);
		}
		currTable.parent().parent().prepend('<div class="theadNewHolder"><table class="data"></table></div>');

		currTable.find("thead").clone().appendTo(currTable.parent().prev().find('table'));
		tableSorterActivate(currTable);
		currTable.parent().parent().width(originalContainerWidth);
		currTable.parent().width(originalContainerWidth);
		currTable.parent().prev().width(originalContainerWidth);
		currTable.parent().prev().find('table').width($(currTable).width());
		//	if($.browser.webkit)
		//		currTable.parent().prev().find('table').css('right',ScrollBarWidth - 1);
		//	else 
		//currTable.parent().prev().find('table').css('right',ScrollBarWidth);
		currTable.parent().prev().find('table').css('left','0');

		tdWidthResizer(currTable);	
	}
}

function addBothScrolls(currTable, originalContainerWidth, popup, maxHeight ){ 
	var ScrollBarWidth = getScrollBarWidth() ;
	// console.log('ScrollBarWidth = ' +ScrollBarWidth);
	// console.log('addBothScrolls');
	if(!currTable.parent().parent().hasClass('tableVertHorScroll_WRAP')){
		currTable.wrap("<div class='tableVertHorScroll_WRAP'></div>"); 
		currTable.wrap("<div class='tableVert_tBody'></div>"); 
		if(popup){
			$('div.tableVert_tBody').height(maxHeight - 70);
		}
		currTable.parent().parent().prepend('<div class="theadNewHolder"><table class="data"></table></div>');

		currTable.find("thead").clone().appendTo(currTable.parent().prev().find('table.data'));
		tableSorterActivate(currTable);
		currTable.parent().parent().width(originalContainerWidth);
		currTable.parent().width(originalContainerWidth);
		currTable.parent().prev().width(originalContainerWidth);
		currTable.parent().prev().find('table').width(currTable.width());
		currTable.parent().prev().find('table').css('right',ScrollBarWidth);
		tdWidthResizer(currTable);

		currTable.parent().scroll(function () {
			currTable.parent().prev().find('table').css('right', 'auto');
			currTable.parent().prev().find('table').css('left', currTable.parent().scrollLeft() *(-1));
		});
	}
}

function tableSorterActivate(currTable){
	var oldHeader = currTable.find('th');
	var newHeader = currTable.parent().prev().find('th');

	currTable.find('th').on('sortEnd', function(){
		for (i=0 ; i<oldHeader.length ;i++) {
			$(newHeader[i]).attr('class', $(oldHeader[i]).attr('class') );
		}
	});

	$(newHeader).click(function(){
		var i = $(newHeader).index(this);
		$(oldHeader[i]).click();
	});
}

function tdWidthResizer(currTable){		
	var tHeadTR = currTable.find('thead tr:first-child th');
	var tHeadNewTR = currTable.parent().prev().find('thead tr th');
	var TDwidth;

	currTable.find('thead tr:first-child th').each(function(){$(this).css('width','auto')});
	currTable.parent().prev().find('thead tr th').each(function(){$(this).css('width','auto')});


	$(tHeadTR).each(function(index){
		TDwidth = $(tHeadTR[index]).css('width');
		$(tHeadNewTR[index]).css('width',TDwidth);
		$(tHeadTR[index]).css('width',TDwidth);				
	});
	setTimeout(function(){
		currTable.parent().scrollLeft(900);
		currTable.parent().scrollTop(-1);
		currTable.parent().scrollTop(1);
	}, 50);
}

function restore(currTable){ 
	if(currTable){
		if(currTable.parent().hasClass("tableWrapHorScroll")){
			// console.log('restore --------tableWrapHorScroll----------------');
			currTable.width('auto');
			currTable.unwrap();
		}
		else if(currTable.parent().parent().hasClass("tableVertHorScroll_WRAP")){
			// console.log('restore --------tableVertHorScroll_WRAP----------------');
			currTable.width('auto');
			$('.theadNewHolder').remove();
			currTable.unwrap();
			currTable.unwrap();
		}
		else if(currTable.parent().parent().hasClass("tableVertScroll_WRAP")){
			// console.log('restore --------tableVertScroll_WRAP----------------');
			currTable.width('auto');
			$('.theadNewHolder').remove();
			currTable.unwrap();
			currTable.unwrap();
		}
	}
}


function performBannerClick(href, msgCode, bank, referer, isNewWin){

	var data = {'action':'actionBannerClicked','MessageCode':msgCode, 'Bank':bank, 'Referer':referer};
	$.ajax({
		url: '/MatafServiceServlets/YozmaServlet',
		type: 'POST',
		data: $.param(data, true)
	});
	setTimeout(function(){
		if("true"==isNewWin)
			window.open(href);
		else
			location.href = href;},1000);
}

$(document).on ("dialogopen",".ui-dialog", function(event, ui){
	$(".ui-button").removeAttr("role");
});

function performNemalaBannerClick(msgCode, bank, referer){

	var data = {'action':'actionBannerClicked','MessageCode':msgCode, 'Bank':bank, 'Referer':referer};
	$.ajax({
		url: '/MatafServiceServlets/YozmaServlet',
		type: 'POST',
		data: $.param(data, true)
	});
	setTimeout(function(){
		$("#nemalaForm").submit();
	},1000);
}

$(document).on('sortEnd', "table.fixedHeaderDynamicTable", function (){
	//console.log('sortEnd');
	var tbl =  $(this);
	var oldHeader = $(tbl).find('th');
	var newHeader = $(tbl).parent().prev().find('th');
	for (i=0 ; i<oldHeader.length ;i++) {
		$(newHeader[i]).attr('class', $(oldHeader[i]).attr('class') );
	}
});


$(document).ready(function () {
	function isIE () {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	} 
	var ua = window.navigator.userAgent;
	if( $("#account_num_select").length){ 
		if (isIE () == 9) {
		} else if (isIE () == 10){
		}else if (ua.indexOf("Trident/7.0") > 0) {	
		}else{
			$('<p id="fromEvent" style="display:none; font-size:30px !important; font-weight:bold; color:#0871c4;"></p>').appendTo("#fibi_main_header");
			check_input();
		}
	}

	
	$('.fixedHeaderDynamicTable').each(function(){
		// console.log('fixedHeaderDynamicTable');
		fixedTableBuild( $(this), 0);
	});

	$('body').on('campaignBannerChangeOpen',function(){  //triggers on loading the first banner

		// console.log('campaignBannerChangeOpen event');
		$('.fixedHeaderDynamicTable').each(function(){
			fixedTableBuild( $(this), 100);
		});
	});

	$('body').on('campaignBannerChangeClose',function(){  //triggers on closing the last banner

		// console.log('campaignBannerChangeClose event');
		$('.fixedHeaderDynamicTable').each(function(){
			fixedTableBuild( $(this), 100);
		});
	});

	$('.show_sidebar').click(function(){
		// console.log('show_sidebar');
		$('.fixedHeaderDynamicTable').each(function(){
			fixedTableBuild( $(this), 700);
		});
	});

	$('.hide_sidebar').click(function(){
		// console.log('hide_sidebar');
		$('.fixedHeaderDynamicTable').each(function(){
			fixedTableBuild( $(this), 700);
		});
	});

	var tabTitle=$('#tabTitle');
	if(tabTitle.length > 0){
		var currTitle=document.title;
		if(currTitle != tabTitle.text())
			document.title=tabTitle.text();
	}

	var mycode176 = '176';
	var mycampaignManagerSugBaka = $("input#campaignManagerSugBaka").val();
	if (mycode176 == mycampaignManagerSugBaka) {
		$("#msgdiv .MESSAGE").each(function(){
			if (!$(this).text().trim().length){
				$(this).css('display','none');
			} 
		});
	}

});	
function getHelpSys(helpid, banknum){
					var prop="status=no,location=no,toolbar=no,width=750,height=550,scrollbars=yes,resizable=yes,top=0,left=0";
					var url = "/MatafWcmServices/Controller?action=GetHelpContent&helpId="+helpid+'&'+'bankNum='+banknum;	
					parent.HelpWindow = window.open(url,'help',prop);
					parent.HelpWindow.focus();
}
function getHelpSysLang(helpid, banknum, lang){
					var prop="status=no,location=no,toolbar=no,width=750,height=550,scrollbars=yes,resizable=yes,top=0,left=0";
					var url = "/MatafWcmServices/Controller?action=GetHelpContent&helpId="+helpid+'&'+'bankNum='+banknum+'&lang='+lang;	
					parent.HelpWindow = window.open(url,'help',prop);
					parent.HelpWindow.focus();
}
function check_input(){
	var addEvent = (function () {
		  if (document.addEventListener) {
			return function (el, type, fn) {
			  if (el && el.nodeName || el === window) {
				el.addEventListener(type, fn, false);
			  } else if (el && el.length) {
				for (var i = 0; i < el.length; i++) {
				  addEvent(el[i], type, fn);
				}
			  }
			};
		  } else {
			return function (el, type, fn) {
			  if (el && el.nodeName || el === window) {
				el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
			  } else if (el && el.length) {
				for (var i = 0; i < el.length; i++) {
				  addEvent(el[i], type, fn);
				}
			  }
			};
		  }
		})();
	var alertText = 'החלפת מספר חשבון בעבודתך בלשונית אחרת באתר הבנק. כל פעילות שתבוצע כעת היא בחשבון מספר ';
	var accountSelect = document.getElementById('account_num_select');
	var   output = document.getElementById('fromEvent');
	
	addEvent(accountSelect, 'change', function () {
	localStorage.setItem('account_num', this.value);
	});
	var hidden = "hidden";
	addEvent(window, 'storage', function (event) {
	  if (event.key == 'account_num') {
		output.innerHTML = alertText + event.newValue;
		//	if (document.visibilityState == "hidden") {
				$(output).dialog('open');
				   $(output).dialog({
				   	position:
				   	{
				   		my: "center",
				   		at: "center",
				   		of: window
				   	},
				   	width: '800',
				   	modal: 'true',
				   	resizable: 'false',
				   	dialogClass : 'everdialog_top_main',
				   	closeText: 'X',
				   	buttons:
				   	{
				   		"סגור": function()
				   		{
				   			$(this).dialog('close');
							
				   		}
				   	}
				   });
				   $(output).on('dialogclose', function(event) {
						window.location.href = "/wps/myportal/FibiMenu/Online";
					});
			//}	  
	  }
	});
}