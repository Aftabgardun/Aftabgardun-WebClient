/**
 * Created by hooman on 8/27/16.
 */

function showOrgInfo(data) {
    $('#title').html(data.name);
    if (data.location) {
        makeRow('مکان', data.location);
    }
    if (data.webpage) {
        makeRow('سایت', $('<a>').attr('href', data.webpage).html(data.webpage));
    }
    if (data.members !== undefined && data.members !== null && data.members.length) {
        var members = $('<div class="ui items">');
        for (var i in data.members) {
            members.append(
                $('<div class="item">').append(
                    $('<div class="image">').append(
                        $('<img>').attr('src', data.members[i].photo)
                    )
                ).append(
                    $('<div class="content">').append(
                        $('<a class="header">').attr('href', 'person.html?id=' + data.members[i].personid).html(data.members[i].name)
                    ).append(
                        $('<div class="meta">').append(
                            $('<span>').html('')
                        )
                    ).append(
                        $('<div class="description">').append(
                            $('<p>').html(data.members[i].keywords)
                        )
                    ).append(
                        $('<div class="extra">').html(data.members[i].occupation)
                    )
                )
            );

            // members.append($('<a></a>').html(data.members[i].name + '<br>').attr('href', 'person.html?id=' + data.members[i].personid));
        }
        makeRow('اعضا', members);
    }
}

$(document).ready(function () {
    var orgid = window.location.search.replace('?id=', '');
    orgInfoRequest(orgid, showOrgInfo, failSearch);
});