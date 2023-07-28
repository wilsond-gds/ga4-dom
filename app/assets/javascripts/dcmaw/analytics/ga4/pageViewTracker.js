/* global window document */

window.DI = window.DI || {}
window.DI.analyticsGa4 = window.DI.analyticsGa4 || {}
window.DI.analyticsGa4.analyticsModules = window.DI.analyticsGa4.analyticsModules || {};

(function (analyticsModules) {

  'use strict'
           console.log('setting up page tracking');
  let PageViewTracker = {

    init: function() {
      console.log('page tracking sending');
      const data = {
        event: 'page_view',
        page_view: {
          language: this.getLanguage(),
          location: document.location.href,
          organisations: '<OT1056>',
          primary_publishing_organisation: 'government digital service - digital identity',
          status_code: 200,
          title: document.title,
        }
      }
      window.DI.core.sendData(data)
    },

    getLanguage: function() {
      return window.DI.cookies.getCookie('lng') ?? 'en'
    }
  }

  analyticsModules.PageViewTracker = PageViewTracker

})(window.DI.analyticsGa4.analyticsModules)
