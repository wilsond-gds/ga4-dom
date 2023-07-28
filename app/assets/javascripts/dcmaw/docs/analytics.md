# Analytics 

This document describes the Google Analytics implementation shared across some front end codebases within Digital 
Identity.

No analytics code is initialised and no data is gathered without user consent.

## Overview

We currently push analytics data to Universal Analytics (UA) via a Google Tag Manager (GTM) container.

As of July 2023, we are in the process of migrating to Google Analytics 4 (GA4). We will push analytics data to 
GA4 via a second GTM container - running both containers in parallel until we are confident to move to the GA4 
implementation only.

## Existing vs new implementation

Our **existing UA implementation** uses functionality relating to analytics and cookie banner initialisation in a single
`src/assets/javascript/cookiesjs/cookies.js` file. We do not currently have unit test coverage for this functionality.

Our **new implementation (which runs UA and GA4 in parallel)** uses functionality relating to analytics and cookie banner 
initialisation in the `src/assets/javascript/analytics` directory. Unit tests covering this functionality are in 
`src/assets/javascript/test/analytics`.

Ideally the 2 sources of analytics functionality described above should be easy to re-use between teams; some 
work is still needed to make these functions completely generic (for example parameterising the `getJourneyMapping` function) 
in the UA data push. 

Consumers of this functionality may choose to toggle between the existing and new implementation. See for example the 
DCMAW `appInit` function (`src/assets/javascript/app/init.js`) which takes an `isGa4Enabled` parameter - when set to 
`'true'`, this enables both UA and GA4 per the new implementation; otherwise it enables just UA per the old 
implementation (cookies.js).

The rest of this documentation will focus on the new implementation as our main focus going forwards. 

## New implementation

2 important functions are provided from the `src/assets/javascript/analytics` directory. They are both set on `window.DI` 
when the scripts are loaded in the browser:

### `cookieBannerInit` 

This function sets up the cookie banner and adds listeners to the accept and reject buttons. When the user clicks 
accept, the user's `cookies_preferences_set` cookie is set to true and a `cookie-consent` event is dispatched. 

This function requires a `domain` parameter - this is the environment-specific domain which cookies (eg. `cookies_preferences_set`) 
should be scoped to. 

### `loadAnalytics`

This function triggers the sending of analytics data to both UA and GA4 by calling the `init` functions in 
`src/assets/javascript/analytics/ua/init.js` and `src/assets/javascript/analytics/ga4/init.js` respectively. 

This function requires a `uaContainerId` and a `ga4ContainerId` to be passed as parameters. 

The init functions first check whether the user has consented to analytics. 

If the user has consented, the init functions:
- load the GTM script (using the containerId's passed as parameters)
- push data to Google Analytics

> in the case of the GA4 init function, this is achieved by running the init functions implemented by various analytics 
trackers set on `window.DI.analyticsGa4.analyticsModules` - for example `src/assets/javascript/analytics/ga4/pageViewTracker.js`.
As we get further into the GA4 implementation, we plan to build out additional trackers (for example a form response
tracker).

If the user has not consented, the init functions:
- set up a listener for the `cookie-consent` event dispatch described in the `cookieBannerInit` section above 
- load the GTM script and push data to Google Analytics on receipt of that event

In practice, this setup means that a page load event fires as soon as a user clicks accept on the cookie banner (ie. we don't 
have to wait for the user to refresh the page to see the page load data). 

## How DCMAW wires analytics functionality into its front end

All the javascript files within `src/assets/javascript` are "ugilified" into a single, minified `application.js` file. 

`application.js` is added to our base nunjucks template (`src/views/common/layout/base.njk`) as a script, which enables 
all the javascript functions described above to be made available on the global window object in the browser. 

We then also call our `appInit` (`src/assets/javascript/app/init.js`) function in the same base nunjucks template which 
initialises analytics and the cookie banner. We pass the domain, containerId's and isGa4Enabled feature toggle as 
parameters; these values are injected by our `setLocalVars` middleware which grabs these values from the current environment. 

Other teams may choose to re-use this approach or implement their own `appInit` function; depending on whether they want
to put the GA4 implementation behind a feature toggle, initialise additional javascript (eg. a loading spinner has been 
mentioned by other teams) etc. 