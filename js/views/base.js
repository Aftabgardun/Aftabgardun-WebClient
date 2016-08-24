/**
 * Created by hooman on 7/26/16.
 */
$(document).ready(function () {
    $('#loginPopup').popup({
        transition : 'fade',
        duration   : 350,
        position   : 'bottom center',
        on         : 'click',
        context: "#loginPop"
    });
    $('.menu .item').tab();
    $('.ui.checkbox').checkbox();
});