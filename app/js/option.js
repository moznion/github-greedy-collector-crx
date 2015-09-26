(function () {
    /*global $, localStorage*/

    var $port = $('#port');
    var $hosts = $('#hosts');
    var $save = $('#save');
    var $autoClone = $('#autoClone');
    var $ignoreFork = $('#ignoreFork');

    $port.val(localStorage.getItem('port'));
    $hosts.val(localStorage.getItem('hosts'));

    var autoClone = localStorage.getItem('autoClone');
    if (autoClone === 'true') {
        $autoClone.prop('checked', true);
    } else {
        $autoClone.prop('checked', false);
    }

    var ignoreFork = localStorage.getItem('ignoreFork');
    if (ignoreFork === 'true') {
        $ignoreFork.prop('checked', true);
    } else {
        $ignoreFork.prop('checked', false);
    }

    $save.click(function () {
        localStorage.setItem('port', $port.val());
        localStorage.setItem('hosts', $hosts.val());
        localStorage.setItem('autoClone', $autoClone.prop('checked'));
        localStorage.setItem('ignoreFork', $ignoreFork.prop('checked'));
        $save.text("saved");
    });
}());
