/* global window document */
/* this tracker created by Derren as a test */
window.DI = window.DI || {}
window.DI.analyticsGa4 = window.DI.analyticsGa4 || {}
window.DI.analyticsGa4.analyticsModules = window.DI.analyticsGa4.analyticsModules || {};

(function (analyticsModules) {

    'use strict'
    console.log('setting up link click tracking');
    let LinkClickTracker = {

        init: function () {
            console.log('link tracker ready');

            const allLinks = document.querySelectorAll('footer a');
            allLinks.forEach(link=>{
                link.addEventListener('click',(event)=>{
                    event.preventDefault();
                    const data = {
                        event: 'navigation',
                        navigation: {
                            language: this.getLanguage(),
                            link_text: event.currentTarget.textContent.trim().toLowerCase(),
                            link_url: event.currentTarget.getAttribute('href').toLowerCase(),
                            organisations: '<OT1056>',
                            primary_publishing_organisation: 'government digital service - digital identity',
                            status_code: 200,
                            title: document.title.toLowerCase(),
                        }
                    }
                    //window.DI.core.sendData(data)
                    window.visualLog(JSON.stringify(data));
                })
            })


        },

        getLanguage: function () {
            return window.DI.cookies.getCookie('lng') ?? 'en'
        }
    }

    analyticsModules.LinkClickTracker = LinkClickTracker

})(window.DI.analyticsGa4.analyticsModules)
