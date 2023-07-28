/* global window document */

window.DI = window.DI || {};

(function (DI) {

  'use strict'

  const core = {

    load: function(uaContainerId) {
      const gtmScriptTag = document.createElement("script");
      gtmScriptTag.type = "text/javascript";
      gtmScriptTag.setAttribute("async", "true");
      gtmScriptTag.setAttribute(
        "src",
        "https://www.googletagmanager.com/gtm.js?id=" + uaContainerId
      );
      gtmScriptTag.setAttribute("crossorigin", "anonymous");
      document.documentElement.firstChild.appendChild(gtmScriptTag);
    },

    sendData: function(data) {
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push(data)
    }
  }

  DI.core = core

})(window.DI)