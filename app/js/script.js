(function () {
    /*global document, localStorage, chrome*/

    var location = document.location;
    var re = new RegExp('^' + location.protocol + '//' + location.host);

    var optionalHosts = [];
    var optionalHostsString = localStorage.getItem('hosts');
    if (optionalHostsString !== null) {
        optionalHosts = optionalHostsString.split('/');
    }

    var hit = false;
    ['https://github.com'].concat(optionalHosts).forEach(function (host) {
        if (host.match(re) !== null) {
            hit = true;
        }
    });

    if (!hit) {
        return;
    }

    var host = document.location.host;
    var proto = document.location.protocol.slice(0, -1);
    var paths = document.location.pathname.split('/');

    var owner = paths[1];
    var repo = paths[2];

    if (typeof owner === 'undefined' || typeof repo === 'undefined') {
        return;
    }

    var port = 8080;
    if (localStorage.getItem('port') !== null) {
        port = localStorage.getItem('port');
    }
    var url = 'http://localhost:' + port;

    chrome.runtime.sendMessage({
        type: 'git-clone',
        url: url,
        proto: proto,
        host: host,
        owner: owner,
        repo: repo
    }, function (response) {
        console.log(response);
    });
}());

