(function () {
    /*global $, chrome*/
    chrome.runtime.onMessage.addListener(function (request) {
        $.post(request.url, {
            proto: request.proto,
            host: request.host,
            owner: request.owner,
            repo: request.repo
        });
    });
}());

