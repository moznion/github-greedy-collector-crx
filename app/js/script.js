var GGC = {
    /*global document, chrome*/
    clone: function () {
        var paths = document.location.pathname.split('/');

        var owner = paths[1];
        var repo = paths[2];

        if (typeof owner === 'undefined' || typeof repo === 'undefined') {
            return;
        }

        var host = document.location.host;

        chrome.runtime.sendMessage({
            type: 'git-clone',
            host: host,
            owner: owner,
            repo: repo
        }, function (response) {
            // console.log(response);
        });
    }
};

(function () {
    /*global document, chrome*/

    chrome.runtime.sendMessage({
        type: "check-domain",
        location: document.location
    }, function (response) {
        if (response.matched === false) {
            return;
        }
        chrome.runtime.sendMessage({
            type: "check-auto-clone"
        }, function (response) {
            if (response.autoClone) {
                GGC.clone();
            } else {
                $('.only-with-full-nav').append('<button id="__ggc-clone" class="btn btn-sm sidebar-button">Clone with GGC</button>')
                $("#__ggc-clone").click(function () {
                    GGC.clone();
                });
            }
        });

    });
}());

