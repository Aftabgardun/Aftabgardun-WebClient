/**
 * Created by hooman on 7/26/16.
 */
function failSearch(message) {
    makeMessage('error', '#personText', '', message);
}

function makeRow(first, second) {
    $('#content').append(
        $('<div class="row"></div>').append(
            $('<div class="four wide column farsi"></div>').html(first)
        ).append(
            $('<div class="twelve wide column farsi"></div>').html(second)
        )
    );
}

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