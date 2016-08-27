/**
 * Created by hooman on 8/24/16.
 */
var cat, isUp = false;
var icons = {
    paper: 'large file outline icon',
    book: 'large book icon',
    trans: 'large flag icon',
    null: 'large file outline icon',
    undifined: 'large file outline icon'
};

function successSearch(data) {
    if (data.results.length == 0) {
        makeMessage('warning', '#searchText', '', 'موردی یافت نشد');
        return;
    }
    $('#searchText').transition('fade');
    $('#searchResult').html('').addClass('segment');
    if (!isUp) {
        $('#titleText').transition('fade up');
        $('#searchUi').css('padding-top', '70px');
        isUp = true;
    }
    if (cat == 'person') {
        data = data.results;
        for (var i in data) {
            $('#searchResult').append(
                $('<div class="item"></div>')
                    .append('<i class="large github middle aligned icon"></i>')
                    .append(
                        $('<div class="content"></div>').append(
                            $('<a class="header"></a>').html(data[i].name).attr('href', 'person.html?id=' + data[i].personid)
                        ).append(
                            $('<div class="description"></div>').html(data[i].occupation)
                        )
                    )
            );
        }
    }
    else if (cat == 'paper') {
        data = data.results;
        for (var i in data) {
            var coAuthors = '';
            for (var j in data[i].authors) {
                coAuthors += '<a href="person.html?id=' + data[i].authors[j].personid + '">' + data[i].authors[j].name + '</a>, '
            }
            $('#searchResult').append(
                $('<div class="item"></div>').append(
                    $('<i></i>').addClass(icons[data[i].publicationtype])
                ).append(
                    $('<div class="content"></div>').append(
                        $('<a class="header"></a>').html(data[i].title).attr('href', 'papers.html?id=' + data[i].paperid)
                    ).append(
                        $('<div class="description">').html(data[i].keywords + '<br>' + coAuthors)
                    ).css('padding-right', '10px')
                )
            );
        }
    }
    else if (cat == 'org') {
        data = data.results;
        for (var i in data) {
            $('#searchResult').append(
                $('<div class="item"></div>').append(
                    $('<i class="large lab icon"></i>')
                ).append(
                    $('<div class="content"></div>').append(
                        $('<a class="header"></a>').html(data[i].name).attr('href', 'org.html?id=' + data[i].orgid)
                    ).append(
                        $('<div class="description">').html(data[i].description)
                    ).css('padding-right', '10px')
                )
            );
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