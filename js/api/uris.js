/**
 * Created by hooman on 8/24/16.
 */
var serverAddress = 'http://172.17.8.119:5000',
    searchUri = '/search/',
    searchMethod = 'POST',
    personInfoUri = '/getpersoninfo/',
    personInfoMethod = 'POST'

    ;



function searchRequest(query, cat, onResponse, onFail) {
    $.ajax({
        url: serverAddress + searchUri,
        method: searchMethod,
        data: {query: query, cat: cat},
        dataType:'json',
        success: function (data, textStatus, jqXHR) {
            onResponse(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            onFail(jqXHR);
        }
    });
}

function personInfoRequest(uid, onResponse, onFail) {
    $.ajax({
        url: serverAddress + personInfoUri,
        method: personInfoMethod,
        data: {personID: uid},
        dataType:'json',
        success: function (data, textStatus, jqXHR) {
            onResponse(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            onFail(jqXHR);
        }
    });
}