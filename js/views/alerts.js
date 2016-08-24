/**
 * Created by hooman on 8/24/16.
 */
function makeMessage(type, element, title, body) {
    $(element).html('')
        .attr('class', 'ui ' + type + ' message transition hidden')
        .append($('<div class="header"></div>').html(title))
        .append('<p>' + body + '</p>').transition('scale');
}