window.DI=window.DI||{};window.DI.analyticsGa4=window.DI.analyticsGa4||{};(function(analytics){"use strict";const init=function(){const consentGiven=window.DI.cookies.hasConsentForAnalytics();if(consentGiven){window.DI.core.load(window.DI.analytics.vars.ga4ContainerId);const analyticsModules=window.DI.analyticsGa4.analyticsModules;console.log("all Analytics Modules: "+JSON.stringify(analyticsModules));for(const module in analyticsModules){if(Object.prototype.hasOwnProperty.call(analyticsModules,module)){const tracker=analyticsModules[module];if(typeof tracker.init==="function"){try{tracker.init()}catch(e){console.warn("Error starting analytics module "+tracker+": "+e.message,window.location)}}}}}else{window.addEventListener("cookie-consent",window.DI.analyticsGa4.init)}};analytics.init=init})(window.DI.analyticsGa4);window.DI=window.DI||{};window.DI.analyticsGa4=window.DI.analyticsGa4||{};window.DI.analyticsGa4.analyticsModules=window.DI.analyticsGa4.analyticsModules||{};(function(analyticsModules){"use strict";console.log("setting up link click tracking");let LinkClickTracker={init:function(){console.log("link tracker ready");const allLinks=document.querySelectorAll("footer a");allLinks.forEach(link=>{link.addEventListener("click",event=>{event.preventDefault();const data={event:"navigation",navigation:{language:this.getLanguage(),link_text:event.currentTarget.textContent.trim().toLowerCase(),link_url:event.currentTarget.getAttribute("href").toLowerCase(),organisations:"<OT1056>",primary_publishing_organisation:"government digital service - digital identity",status_code:200,title:document.title.toLowerCase()}};window.visualLog(JSON.stringify(data))})})},getLanguage:function(){return window.DI.cookies.getCookie("lng")??"en"}};analyticsModules.LinkClickTracker=LinkClickTracker})(window.DI.analyticsGa4.analyticsModules);window.DI=window.DI||{};window.DI.analyticsGa4=window.DI.analyticsGa4||{};window.DI.analyticsGa4.analyticsModules=window.DI.analyticsGa4.analyticsModules||{};(function(analyticsModules){"use strict";console.log("setting up page tracking");let PageViewTracker={init:function(){console.log("page tracking sending");const data={event:"page_view",page_view:{language:this.getLanguage(),location:document.location.href,organisations:"<OT1056>",primary_publishing_organisation:"government digital service - digital identity",status_code:200,title:document.title}};window.DI.core.sendData(data)},getLanguage:function(){return window.DI.cookies.getCookie("lng")??"en"}};analyticsModules.PageViewTracker=PageViewTracker})(window.DI.analyticsGa4.analyticsModules);window.DI=window.DI||{};window.DI.analyticsUa=window.DI.analyticsUa||{};(function(analytics){"use strict";function initGtm(){window.dataLayer=[{"gtm.allowlist":["google"],"gtm.blocklist":["adm","awct","sp","gclidw","gcs","opt"]}];const gaDataElement=document.getElementById("gaData");const sessionJourney=getJourneyMapping(window.location.pathname);const criJourney=criDataLayer(gaDataElement?gaDataElement.value:"undefined");function gtag(obj){dataLayer.push(obj)}if(sessionJourney){gtag(sessionJourney)}if(criJourney){gtag(criJourney)}gtag({"gtm.start":(new Date).getTime(),event:"gtm.js"})}function initLinkerHandlers(){const submitButton=document.querySelector('button[type="submit"]');const pageForm=document.getElementById("form-tracking");if(submitButton&&pageForm){submitButton.addEventListener("click",function(){if(window.ga&&window.gaplugins){const tracker=ga.getAll()[0];const linker=new window.gaplugins.Linker(tracker);const destinationLink=linker.decorate(pageForm.action);pageForm.action=destinationLink}})}const trackLink=document.getElementById("track-link");if(trackLink){trackLink.addEventListener("click",function(e){e.preventDefault();if(window.ga&&window.gaplugins){const tracker=ga.getAll()[0];const linker=new window.gaplugins.Linker(tracker);const destinationLink=linker.decorate(trackLink.href);window.location.href=destinationLink}else{window.location.href=trackLink.href}})}}function generateSessionJourney(journey,status){return{sessionjourney:{journey:journey,status:status}}}function criDataLayer(criJourney="undefined"){return{event:"page_view",page:{cri_type:"document checking online",cri_journey:criJourney,organisations:"DI"}}}function getJourneyMapping(url){const JOURNEY_DATA_LAYER_PATHS={"/authorize":generateSessionJourney("authorize","start"),"/callback":generateSessionJourney("authorize","end"),"/finishBiometricCheck":generateSessionJourney("authorize","end"),"/flashingWarning":generateSessionJourney("authorize","middle"),"/validDrivingLicence":generateSessionJourney("authorize","middle"),"/workingCamera":generateSessionJourney("authorize","middle"),"/readyCheck":generateSessionJourney("authorize","middle"),"/downloadApp":generateSessionJourney("authorize","middle"),"/abort":generateSessionJourney("authorize","end"),"/simpleDevice":generateSessionJourney("authorize","end")};return JOURNEY_DATA_LAYER_PATHS[url]}const init=function(){const consentGiven=window.DI.cookies.hasConsentForAnalytics();if(consentGiven){window.DI.core.load(window.DI.analytics.vars.uaContainerId);initGtm();initLinkerHandlers()}else{window.addEventListener("cookie-consent",window.DI.analyticsUa.init)}};analytics.init=init})(window.DI.analyticsUa);window.DI=window.DI||{};(function(DI){"use strict";const COOKIES_PREFERENCES_SET="cookies_preferences_set";const cookiesAccepted=document.querySelector("#cookies-accepted");const cookiesRejected=document.querySelector("#cookies-rejected");const hideCookieBanner=document.querySelectorAll(".cookie-hide-button");const cookieBannerContainer=document.querySelector(".govuk-cookie-banner");const cookieBanner=document.querySelector("#cookies-banner-main");const acceptCookies=document.querySelector('button[name="cookiesAccept"]');const rejectCookies=document.querySelector('button[name="cookiesReject"]');function cookieBannerInit(domain){if(!domain){console.warn(`Cookie banner cannot be initialised: domain is ${domain}`);return}acceptCookies.addEventListener("click",function(event){event.preventDefault();setBannerCookieConsent(true,domain)}.bind(this));rejectCookies.addEventListener("click",function(event){event.preventDefault();setBannerCookieConsent(false,domain)}.bind(this));const hideButtons=Array.prototype.slice.call(hideCookieBanner);hideButtons.forEach(function(element){element.addEventListener("click",function(event){event.preventDefault();hideElement(cookieBannerContainer)}.bind(this))});const hasCookiesPolicy=window.DI.cookies.getCookie(COOKIES_PREFERENCES_SET);if(!hasCookiesPolicy){showElement(cookieBannerContainer)}}function setBannerCookieConsent(analyticsConsent,domain){window.DI.cookies.setCookie(COOKIES_PREFERENCES_SET,{analytics:analyticsConsent},{days:365},domain);hideElement(cookieBanner);if(analyticsConsent){showElement(cookiesAccepted);let event;if(typeof window.CustomEvent==="function"){event=new window.CustomEvent("cookie-consent")}else{event=document.createEvent("CustomEvent");event.initCustomEvent("cookie-consent")}window.dispatchEvent(event)}else{showElement(cookiesRejected)}}function hideElement(el){el.style.display="none"}function showElement(el){el.style.display="block"}DI.cookieBannerInit=cookieBannerInit})(window.DI);window.DI=window.DI||{};(function(DI){"use strict";const cookies={hasConsentForAnalytics:function(){const COOKIES_PREFERENCES_SET="cookies_preferences_set";const cookieConsent=JSON.parse(decodeURIComponent(this.getCookie(COOKIES_PREFERENCES_SET)));return cookieConsent?cookieConsent.analytics:false},getCookie:function(name){const nameEQ=name+"=";if(document.cookie){const cookies=document.cookie.split(";");for(let i=0,len=cookies.length;i<len;i++){let cookie=cookies[i];while(cookie.startsWith(" ")){cookie=cookie.substring(1,cookie.length)}if(cookie.startsWith(nameEQ)){return cookie.substring(nameEQ.length)}}}return null},setCookie:function(name,values,options,domain){if(typeof options==="undefined"){options={}}let cookieString=`${name}=${encodeURIComponent(JSON.stringify(values))}`;if(options.days){const date=new Date;date.setTime(date.getTime()+options.days*24*60*60*1e3);cookieString=`${cookieString}; Expires=${date.toUTCString()}; Path=/; Domain=${domain}`}if(document.location.protocol==="https:"){cookieString=`${cookieString}; Secure`}document.cookie=cookieString}};DI.cookies=cookies})(window.DI);window.DI=window.DI||{};(function(DI){"use strict";const core={load:function(uaContainerId){const gtmScriptTag=document.createElement("script");gtmScriptTag.type="text/javascript";gtmScriptTag.setAttribute("async","true");gtmScriptTag.setAttribute("src","https://www.googletagmanager.com/gtm.js?id="+uaContainerId);gtmScriptTag.setAttribute("crossorigin","anonymous");document.documentElement.firstChild.appendChild(gtmScriptTag)},sendData:function(data){window.dataLayer=window.dataLayer??[];window.dataLayer.push(data)}};DI.core=core})(window.DI);window.DI=window.DI||{};window.DI.analytics=window.DI.analytics||{};window.DI.analytics.vars=window.DI.analytics.vars||{};(function(DI){"use strict";function loadAnalytics(uaContainerId,ga4ContainerId){if(!uaContainerId){console.warn(`UA analytics will not be initialised: uaContainerId is ${uaContainerId}`);return}if(!ga4ContainerId){console.warn(`GA4 analytics will not be initialised: ga4ContainerId is ${ga4ContainerId}`);return}window.DI.analytics.vars.uaContainerId=uaContainerId;window.DI.analyticsUa.init();window.DI.analytics.vars.ga4ContainerId=ga4ContainerId;window.DI.analyticsGa4.init()}DI.loadAnalytics=loadAnalytics})(window.DI);window.DI=window.DI||{};const visualLog=content=>{console.log(content)};window.visualLog=visualLog;window.onload=function(){if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){setVoiceOverFocus()}};function setVoiceOverFocus(){const focusInterval=10;const focusTotalRepetitions=10;const mainContent=document.getElementsByTagName("main")["main-content"];const cookieBanner=document.getElementsByClassName("govuk-cookie-banner")[0];const mainElement=cookieBanner.style.display==="block"?cookieBanner:mainContent;mainElement.setAttribute("tabindex","0");mainElement.blur();let focusRepetitions=0;const interval=window.setInterval(function(){mainElement.focus();focusRepetitions++;if(focusRepetitions>=focusTotalRepetitions){window.clearInterval(interval)}},focusInterval)}(function(DI){"use strict";function appInit({analyticsCookieDomain,uaContainerId,isGa4Enabled,ga4ContainerId}){if(isGa4Enabled==="true"){window.DI.cookieBannerInit(analyticsCookieDomain);window.DI.loadAnalytics(uaContainerId,ga4ContainerId)}else{const cookies=window.GOVUKFrontend.Cookies(uaContainerId,analyticsCookieDomain);if(cookies.hasConsentForAnalytics()){cookies.initAnalytics()}cookies.cookieBannerInit()}}DI.appInit=appInit})(window.DI);