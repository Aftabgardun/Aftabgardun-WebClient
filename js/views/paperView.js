/**
 * Created by hooman on 8/27/16.
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

var icons = {
    paper: 'مقاله',
    book: 'کتاب',
    trans: 'ترجمه',
    null: '-',
    undefined: '-'
};

function showPaperInfo(data) {
    $('#title').html(data.title);
    if (data.authors !== undefined && data.authors !== null && data.authors.length) {
        var authors = $('<div>');
        for (var i in data.authors) {
            authors.append($('<a></a>').html(data.authors[i].name).attr('href', 'person.html?id=' + data.authors[i].personid));
        }
        makeRow('نویسندگان', authors);
    }
    if (data.date) {
        makeRow('تاریخ انتشار', data.date);
    }
    if (data.keywords) {
        makeRow('کلید واژه ها', data.keywords.join('-'));
    }
    if (data.publicationtype) {
        makeRow('نوع انتشار', icons[data.publicationtype]);
    }
    if (data.citedby) {
        makeRow('تعداد مرجوعات', data.citedby);
    }
    if (data.publisher) {
        makeRow('ناشر', data.publisher);
    }
    if (data.digest) {
        makeRow('چکیده', data.digest);
    }
    if (data.content) {
        makeRow('لینک', data.content);
    }

}

$(document).ready(function () {
    var paperid = window.location.search.replace('?id=', '');
    paperInfoRequest(paperid, showPaperInfo, failSearch);
});