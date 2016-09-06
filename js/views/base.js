/**
 * Created by hooman on 7/26/16.
 */
function QueryString () {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}

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