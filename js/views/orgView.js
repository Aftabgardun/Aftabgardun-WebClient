/**
 * Created by hooman on 8/27/16.
 */

function showOrgInfo(data) {

}

$(document).ready(function () {
    var orgid = window.location.search.replace('?id=', '');
    orgInfoRequest(orgid, showOrgInfo, failSearch);
});