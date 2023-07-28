// create buttons to view and clear cookies

(function () {
    const addButton = document.querySelector('body');
    addButton.insertAdjacentHTML('afterbegin', '<a href="#" class="cookie-information clear">clear cookies</a>');
    const monitorButton = document.querySelector('.cookie-information.clear');
    monitorButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Clearing cookies...');
        console.log('Cookies set: ' + document.cookie);
        document.cookie.split(";").forEach(function (c) {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        window.localStorage.clear();
        console.log('Cookie status after clearing: ' + document.cookie);

    })

    addButton.insertAdjacentHTML('afterbegin', '<a href="#" class="cookie-information view">view cookies in console</a>');
    const monitorViewButton = document.querySelector('.cookie-information.view');
    monitorViewButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Current cookies:');
        console.log(document.cookie);
    })
})();

// write a message to the console when elements are added to the head

// Select the node that will be observed for mutations
const targetNode = document.querySelector("head");

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === "childList") {
            console.log('ADDED: '+mutation.addedNodes[0].outerHTML);
        }
        // } else if (mutation.type === "attributes") {
        //     console.log(`The ${mutation.attributeName} attribute was modified.`);
        // }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
