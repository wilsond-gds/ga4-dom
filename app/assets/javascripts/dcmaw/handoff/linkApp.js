/* global window */

(async function (w) {
    async function linkApp(apiUrl, sessionId, redirectPath, pathToLinkApp) {
        const url = `${apiUrl}/isSessionFinished/${sessionId}`;

        const config = {
            mode: "cors"
        };

        const response = await window.fetch(url, config)
        if (response.status === 200) {
            window.location.href = `${redirectPath}?sessionId=${sessionId}&manualRedirect=true`
        } else {
            window.location.href = `${pathToLinkApp}`
        }
    }

    w.GOVUKFrontend.linkApp = linkApp
})(window);
