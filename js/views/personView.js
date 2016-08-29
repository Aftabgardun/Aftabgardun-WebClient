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
var co = {};

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
    if (data.organizations.length) {
        for (var i in data.organizations) {
            $('#org').append(
                $('<a></a>').html(data.organizations[i].name + '<br>').attr('href', 'org.html?id=' + data.organizations[i].orgid)
            );
        }
    }
    if (data.papers) {
        for (var i in data.papers) {
            var coAuthors = '';
            for (var j in data.papers[i].authors) {
                if (co[data.papers[i].authors[j].personid] === undefined && data.papers[i].authors[j].personid != personid)
                    co[data.papers[i].authors[j].personid] = [1, data.papers[i].authors[j].name];
                else if (data.papers[i].authors[j].personid != personid)
                    ++co[data.papers[i].authors[j].personid][0];
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
        var li = [];
        for (var i in co)
            li.push([i, co[i][0], co[i][1]]);
        li.sort(function (a, b) {return b[1] - a[1]});
        for (var i in li)
            if (i < 10)
                $('#coAuthor').append($('<a class="item">').html(li[i][2]).attr('href', 'person.html?id=' + li[i][0]));

        $('#coAuthor').append($('<a class="item farsi">').attr('href', 'graph.html?id=' + personid).html('بیشتر.....'));
    }
}
var personid;
$(document).ready(function () {
    personid = window.location.search.replace('?id=', '');
    personInfoRequest(personid, showPersonDetail, failSearch);
    $('form#miniSearchForm').form({
        fields: {
            query: 'empty',
            cat: 'empty'
        },
        onSuccess: function (event, fields) {
            window.location.assign('index.html?query=' + fields.query + '&cat=' + fields.cat);
        }
    });
});
