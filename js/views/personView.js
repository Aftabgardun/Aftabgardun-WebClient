/**
 * Created by hooman on 8/24/16.
 */

function failSearch(message) {
    makeMessage('error', '#personText', '', message);
}

function showPersonDetail(data) {
    if (data.photo)
        $('#avatarLink').attr('src', data.photo);
    if (data.keywords) {
        $('#keywords').html('');
        for (var i in data.keywords) {
            $('#keywords').append($('<a></a>').html(data.keywords[i] + ' ,'));
        }
    }
    if (data.occupation)
        $('#occupation').html(data.occupation);
    if (data.name)
        $('#personName').html(data.name);
    if (data.webpages.length) {
        for (var i in data.webpages) {
            $('#homePage').append($('<a></a>').html(data.webpages[i]).attr('href', data.webpages[i]));
        }
    }
}

$(document).ready(function () {
    var personid = window.location.search.replace('?id=', '');
    personInfoRequest(personid, showPersonDetail, failSearch);
});