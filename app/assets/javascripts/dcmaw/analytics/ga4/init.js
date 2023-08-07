/* global window */

window.DI = window.DI || {}
window.DI.analyticsGa4 = window.DI.analyticsGa4 || {};

(function (analytics) {

  'use strict'

  const init = function() {

    const consentGiven = window.DI.cookies.hasConsentForAnalytics()

    if (consentGiven) {
      window.DI.core.load(window.DI.analytics.vars.ga4ContainerId)
      const analyticsModules = window.DI.analyticsGa4.analyticsModules
      console.log('all Analytics Modules: '+ JSON.stringify(analyticsModules));

      for (const module in analyticsModules) {
        if (Object.prototype.hasOwnProperty.call(analyticsModules, module)) {
          const tracker = analyticsModules[module]
          if (typeof tracker.init === 'function') {
            try {
              tracker.init()
            } catch (e) {
              // if there's a problem with the module, catch the error to allow other modules to start
              /* eslint-disable-next-line no-console */
              console.warn('Error starting analytics module ' + tracker + ': ' + e.message, window.location)
            }
          }
        }
      }
    } else {
      window.addEventListener('cookie-consent', window.DI.analyticsGa4.init)
    }
  }

  analytics.init = init

})(window.DI.analyticsGa4)