function setDisplayElmForPrint(a,b){var c=document.getElementById(a);alert("test"+c);if(c){if(b){c.style.display="table-row"}else{c.style.display="none"}}}function disableElementsForPrint(){alert("2");var f=document.getElementById("additionalTools");if(f){f.style.visibility="hidden"}var c=["input","button","select"];for(var e=0;e<c.length;e++){var a=document.getElementsByTagName(c[e]);if(a){for(var b=0;b<a.length;b++){if(a[b].id=="printPrint"||a[b].id=="closePrint"){continue}if((e==0&&(a[b].type=="button"||a[b].type=="submit"))){a[b].style.display="none";continue}a[b].setAttribute("disabled","true");try{a[b].removeAttribute("href");a[b].removeAttribute("onClick");a[b].removeAttribute("onclick");a[b].readOnly=true}catch(d){}}}}}function disableHref(){var b=document.getElementsByTagName("a");for(var a=0;a<b.length;a++){b[a].readOnly="true"}};