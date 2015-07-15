/* 
@Name: adTrak.js
@Author: Giancarlo Morillo
@Email: gmorillo@levelg.com
@git: levelg
*/

var abTrak = {

	scriptURL : 'js/adsbygoogle.js',
	blocked : true,
	test1complete: false,
	test2complete: false,

	util : {
		loadScript : function(url, callback) {
			if(!url || !(typeof url === 'string')) return;
		    var script = document.createElement('script');
		    if(typeof(document.attachEvent)==="object"){
		        script.onreadystatechange = function(){ ////if this is IE8 and below
		            if(script.readyState === 'loaded'){
		                if(callback) callback();
		            };
		        };  
		    } else {
		        script.onload = function(){ //this is not IE8 and below
		            if (callback) callback();
		        };
		    };
		    script.src = url;
		    document.getElementsByTagName('head')[0].appendChild(script);

		    // Timer to give loading a chance before giving up
		    var scriptLoadCheckCounter = 0;
		    var scriptLoadCheck = setInterval(function() {
		    	scriptLoadCheckCounter++;
		    	if (scriptLoadCheckCounter >= 5) {
			    	clearInterval(scriptLoadCheck);
			    	abTrak.test1complete = true;
			    }
		    },50);
		},
		checkGPT : function(callback) {
			var dfpLoadCheckCounter = 0;
			var dfpLoadCheck = setInterval(function() {
			  if (typeof window.googletag == "object") {
				clearInterval(window.dfpLoadCheck);
				if (callback) callback();
				// dfp detected
			  } else {
			    dfpLoadCheckCounter++;
			    if (dfpLoadCheckCounter >= 5) {
			    	clearInterval(dfpLoadCheck);
			    	abTrak.test2complete = true;
			    }
			  }
			},50);
		}
	},
	test : {
		adScript : function() {
			abTrak.util.loadScript(abTrak.scriptURL,function(){
			    if(typeof(window.isAdsDisplayed)==='undefined' ) abTrak.blocked = false;
			    abTrak.test1complete = true;
			    // TODO: clear interval if still running...
			});
		},
		gptScript : function() {
			abTrak.util.checkGPT(function() {
				var callOnce = 0;
				window.googletag.pubads().addEventListener('slotRenderEnded', function(event) {
					if(callOnce==0){
						if (!event.isEmpty) {
							var element = document.getElementById(event.slot.getSlotId().getDomId());
							if(element.offsetHeight!=0 && element.style.visibility!='hidden' && element.style.display!='none') {
								abTrak.blocked = false;
							}
						}
						abTrak.test2complete = true;
						callOnce++;
					}
				});
			});
		}
	},
	getStatus : function() {
		//console.log('test1complete: ' +abTrak.test1complete);
		//console.log('test2complete: ' +abTrak.test2complete);
		if(abTrak.test1complete || abTrak.test2complete) {
			return abTrak.blocked;
		} else {
			return 'failed';
		}
	},
	init : function() {
		abTrak.test.adScript();
		abTrak.test.gptScript();
	}
};
abTrak.init();