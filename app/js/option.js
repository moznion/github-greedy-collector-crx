(function () {
    /*global $, localStorage*/

    var $port = $('#port');
    var $hosts = $('#hosts');
    var $save = $('#save');

    $port.val(localStorage.getItem('port'));
    $hosts.val(localStorage.getItem('hosts'));

    $save.click(function () {
        localStorage.setItem('port', $port.val());
        localStorage.setItem('hosts', $hosts.val());

        $save.text("saved");
    });
}());

