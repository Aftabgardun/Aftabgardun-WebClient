/**
 * Created by hooman on 8/24/16.
 */
var cat, isUp = false;
function failSearch(message) {
    makeMessage('error', '#searchText', '', message);
}
function successSearch(data) {
    if (cat == 'person') {
        if (data.results.length == 0) {
            makeMessage('warning', '#searchText', '', 'موردی یافت نشد');
            return;
        }
        else {
            if (!isUp) {
                $('#titleText').transition('fade up');
                $('#searchUi').css('padding-top', '70px');
                isUp = true;
            }
            $('#searchResult').html('').addClass('segment');
            data = data.results;
            for (var i in data) {
                $('#searchResult').append($('<div class="item"></div>').append('<i class="large github middle aligned icon"></i>')
                    .append($('<div class="content"></div>').append($('<a class="header"></a>').html(data[i].name)
                        .attr('href', 'person.html?id=' + data[i].personid)).append($('<div class="description"></div>').html(data[i].occupation))));
            }
        }
    }
}

$(document).ready(function () {
    $('form#searchForm').form({
        fields: {
            cat: 'empty',
            text: 'empty'
        },
        onSuccess: function (event, fields) {
            cat = fields.cat;
            searchRequest(fields.query, fields.cat, successSearch, failSearch);
            return false;
        }
    });
});