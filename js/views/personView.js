/**
 * Created by hooman on 8/24/16.
 */
var icons = {
    paper: 'large file outline icon',
    book: 'large book icon',
    trans: 'large flag icon',
    null: 'large file outline icon',
    undefined: 'large file outline icon'
};
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
            $('#homePage').append(
                $('<a></a>').html(data.webpages[i] + '<br>').attr('href', data.webpages[i])
            );
        }
    }
    if (data.papers) {
        for (var i in data.papers) {
            var coAuthors = '';
            for (var j in data.papers[i].authors) {
                coAuthors += '<a href="?id=' + data.papers[i].authors[j].personid + '">' + data.papers[i].authors[j].name + '</a>, '
            }
            $('#papers').append(
                $('<div class="item"></div>').append(
                    $('<i></i>').addClass(icons[data.papers[i].publicationtype])
                ).append(
                    $('<div class="content"></div>').append(
                        $('<a class="header"></a>').html(data.papers[i].title).attr('href', 'papers.html?id=' + data.papers[i].paperid)
                    ).append(
                        $('<div class="description">').html(data.papers[i].keywords + '<br>' + coAuthors)
                    ).css('padding-right', '10px')
                )
            );
        }
    }
}

$(document).ready(function () {
    var personid = window.location.search.replace('?id=', '');
    personInfoRequest(personid, showPersonDetail, failSearch);
});