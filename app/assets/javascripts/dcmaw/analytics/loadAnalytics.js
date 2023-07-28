/* global window */

window.DI = window.DI || {};
window.DI.analytics = window.DI.analytics || {};
window.DI.analytics.vars = window.DI.analytics.vars || {};

(function(DI) {

  'use strict'

  function loadAnalytics(uaContainerId, ga4ContainerId) {

    if (!uaContainerId) {
      /* eslint-disable-next-line no-console */
      console.warn(`UA analytics will not be initialised: uaContainerId is ${uaContainerId}`)
      return
    }

    if (!ga4ContainerId) {
      /* eslint-disable-next-line no-console */
      console.warn(`GA4 analytics will not be initialised: ga4ContainerId is ${ga4ContainerId}`)
      return
    }


    window.DI.analytics.vars.uaContainerId = uaContainerId
    window.DI.analyticsUa.init()

    window.DI.analytics.vars.ga4ContainerId = ga4ContainerId
    window.DI.analyticsGa4.init()
  }

  DI.loadAnalytics = loadAnalytics

})(window.DI)