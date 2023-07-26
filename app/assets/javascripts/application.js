//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
    // Add JavaScript here
    const addReadout = document.querySelector('body');
    addReadout.insertAdjacentHTML("afterbegin", '<div class="ga-readout"><span class="notice">listening for events...</span></div>');

    // probably needs to be a bit more complex...
    
    updateReadout('<span class="status">Page loaded</span>')
    
    // do this onLoad

    const findErrorSummary = document.querySelectorAll('.govuk-error-summary');
    if (findErrorSummary.length > 0) {
        updateReadout('<span class="form">Error summary found</span>');
        findErrorSummary.forEach((foundError) => {
            const errorMessage = foundError.querySelectorAll('ul>li');
            errorMessage.forEach(individualMessage => {
                updateReadout('<span class="form detail">' + individualMessage.textContent.trim() + '</span>');
            })

        })
    }

    const findFormErrors = document.querySelectorAll('.govuk-form-group--error');
    if (findFormErrors.length > 0) {
        updateReadout('<span class="form">Error readout found</span>');
        findFormErrors.forEach((foundError) => {
            const errorMessage = foundError.querySelectorAll('.govuk-error-message');
            console.log(errorMessage);
            errorMessage.forEach(individualMessage => {
                updateReadout('<span class="form detail">' + individualMessage.textContent.trim() + '</span>');
            })

        })
    }


    function updateReadout(content) {
        const findReadout = document.querySelector('.ga-readout');
        findReadout.innerHTML = findReadout.innerHTML + content;
    }



    // isn’t happy with the GOV.UK header link
    const allHeaderLinks = document.querySelectorAll('header a,a.govuk-skip-link');
    allHeaderLinks.forEach((foundLink) => {
        foundLink.addEventListener('click', event => {
            event.preventDefault();
            updateReadout('<span class="click"><b>header &lt;a&gt; element clicked</b><br />text: ' + event.target.textContent + '<br>href: ' + event.target.getAttribute('href') + '</span>');
        })
    })

    const allFooterLinks = document.querySelectorAll('footer a');
    allFooterLinks.forEach((foundLink) => {
        foundLink.addEventListener('click', event => {
            event.preventDefault();
            updateReadout('<span class="click"><b>footer &lt;a&gt; element clicked</b><br />text: ' + event.target.textContent + '<br>href: ' + event.target.getAttribute('href') + '</span>');
        })
    })

    const allContentLinks = document.querySelectorAll('main a');
    allContentLinks.forEach((foundLink) => {
        foundLink.addEventListener('click', event => {
            event.preventDefault();
            const getObjectValue = JSON.parse(event.target.dataset.ga4);
            console.log(getObjectValue.key2);
            updateReadout('<span class="click"><b>main &lt;a&gt; element clicked</b><br />text: ' + event.target.textContent + '<br>href: ' + event.target.getAttribute('href') + '<br>dataset: ' + JSON.stringify(JSON.parse(event.target.dataset.ga4)) + '</span>');
        })
    })

    const allButtons = document.querySelectorAll('button');

    allButtons.forEach((foundButton) => {
        foundButton.addEventListener('click', event => {
            event.preventDefault();
            updateReadout('<span class="click"><b>&lt;button&gt; element clicked</b><br />text: ' + event.target.textContent + '</span>');
        })
    })

    const allRadios = document.querySelectorAll('input[type="radio"]');

    allRadios.forEach((foundRadio) => {
        foundRadio.addEventListener('click', event => {
            updateReadout('<span class="click"><b>&lt;input radio&gt; element clicked</b><br />text: ' + event.target.nextElementSibling.textContent + '<br />value: ' + event.target.value + '</span>');
        })
    })

    const allDetails = document.querySelectorAll('details');

    allDetails.forEach((foundDetail) => {
        foundDetail.addEventListener('click', event => {
            console.log(foundDetail.open);
            console.log(foundDetail.dataset); // event doesn’t seem to work here
            console.log(foundDetail.dataset.ga4Info);  // transforms data-ga4-info into ga4Info
            const getObjectValue = JSON.parse(foundDetail.dataset.ga4Info);
            console.log(getObjectValue);
            summaryText = foundDetail.querySelector('summary').textContent.trim();
            updateReadout('<span class="click"><b>&lt;details&gt; element clicked</b><br>isClosed: ' + foundDetail.open + '<br>summary: ' + summaryText + '<br>dataset: ' + JSON.stringify(JSON.parse(foundDetail.dataset.ga4Info)) + '</span>');
        })
    })


    // closes document ready
})
