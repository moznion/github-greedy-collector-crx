(function () {
    /*global $, chrome, localStorage */
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var type = request.type;

        switch (type) {
            case 'git-clone':
                var port = 8080;
                var optionalPort = localStorage.getItem('port');
                if (typeof optionalPort === 'undefined') {
                    port = optionalPort;
                }
                var url = 'http://localhost:' + port;

                $.post(url, {
                    host: request.host,
                    owner: request.owner,
                    repo: request.repo
                });
                sendResponse({message: 'Requested cloning'});
                break;
            case 'check-domain':
                var location = request.location;
                var re = new RegExp('^' + location.protocol + '//' + location.host);

                var optionalHosts = [];
                var optionalHostsString = localStorage.getItem('hosts');
                if (optionalHostsString !== null) {
                    optionalHosts = optionalHostsString.split(',');
                }

                var matched = false;
                ['https://github.com'].concat(optionalHosts).forEach(function (host) {
                    if (host.match(re) !== null) {
                        matched = true;
                    }
                });

                sendResponse({matched: matched});
                break;
            case 'check-auto-clone':
                var autoClone = localStorage.getItem('autoClone');
                sendResponse({autoClone: autoClone === 'true'});
                break;
            default:
        }
    });
}());

