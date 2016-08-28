/**
 * Created by hooman on 8/27/16.
 */
var start, nodes = {}, self = '', s = new sigma('c');

function getNodePosition (x, y, r1, r2, cx, cy) {
    if (cx === undefined || cy === undefined) {
        var rnd = Math.random();
        var r = (r2 - r1) * rnd + r1;
        var t = Math.random() * 2 * Math.PI;
        return {
            x: r * Math.cos(t) + x,
            y: r * Math.sin(t) + y
        }
    }
    else {
        var rnd = Math.random();
        var r = (r2 - r1) * rnd + r1;
        var t = (Math.random() - 0.5) * 0.25 * Math.PI + Math.atan((cy-y)/(cx-x));
        if ((cx-x) < 0)
        {
            t += Math.PI;
        }
        t = -t + Math.PI/2;
        return {
            x: r * Math.cos(t) + x,
            y: r * Math.sin(t) + y
        }
    }

}

function showmore(data) {
    self = data.name;
    nodes[start] = {name: self, id:start, neighbors: []};
    s.graph.addNode({
        id: start,
        label: self,
        x: 0,
        y: 0,
        size: 1,
        color: '#f00'
    });

    for (var i in data.others) {
        if (nodes[data.others[i].personid] === undefined) {
            nodes[data.others[i].personid] = {name: data.others[i].name, id: data.others[i].personid, neighbors: []};
            s.graph.addNode({
                id:data.others[i].personid,
                label: data.others[i].name,
                x: 0,
                y: 0,
                size: 1,
                color: '#6DFFFF'
            });
        }
    }

    for (var i in data.others) {
        if (data.others[i].from == start && data.others[i].personid != start) {
            var point = getNodePosition(0, 0, 400, 600);

            var ref = s.graph.nodes(data.others[i].personid);
            ref.x = point.x;
            ref.y = point.y;
            nodes[data.others[i].personid]["isDirectNeighbor"] = true;

        }
        else if (data.others[i].personid != start) {
            var ref = s.graph.nodes(data.others[i].from);
            var point = getNodePosition(ref.x, ref.y, 1500, 2000, 0 ,0);

            ref = s.graph.nodes(data.others[i].personid);
            if (ref.x == 0 && ref.y == 0) {
                ref.x = point.x;
                ref.y = point.y;
            }
        }

        if (nodes[data.others[i].personid].neighbors.lastIndexOf(data.others[i].from) == -1){

            s.graph.addEdge({
                id: data.others[i].personid + ':' + data.others[i].from,
                source: data.others[i].from,
                target: data.others[i].personid,
                color: ((data.others[i].from == start || data.others[i].personid == start) ? '#FF0000' :
                    ((nodes[data.others[i].personid].isDirectNeighbor && nodes[data.others[i].from].isDirectNeighbor)?'#ccd000':'#cccccc'))
            });
        }

        nodes[data.others[i].personid].neighbors.push(data.others[i].from);
        nodes[data.others[i].from].neighbors.push(data.others[i].personid);

        var e1 = s.graph.edges(data.others[i].personid + ':' + data.others[i].from);
        var e2 = s.graph.edges(data.others[i].from + ':' + data.others[i].personid);
        var myfunc = function (a, b) {
            var count = 0;
            for(var i = 0; i < a.length; ++i){
                if(a[i] == b)
                    count++;
            }
            return parseInt(count / 10);
        };
        if (e1) {
            e1.size = myfunc(nodes[data.others[i].personid].neighbors, data.others[i].from);
            console.log(e1);
        }
        else {
            e2.size = myfunc(nodes[data.others[i].from].neighbors, data.others[i].personid);
            console.log(e2);
        }
    }

    s.settings({
        minEdgeSize: 1,
        maxEdgeSize: 5
    });
    s.refresh();
    s.bind('clickNode', function (w) {
        window.location.assign('?id=' + w.data.node.id);
    }).bind('overNode', function (e){

    });
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
    if (data.organizations.length) {
        for (var i in data.organizations) {
            $('#org').append(
                $('<a></a>').html(data.organizations[i].name + '<br>').attr('href', 'org.html?id=' + data.organizations[i].orgid)
            );
        }
    }
}

$(document).ready(function () {
    start = window.location.search.replace('?id=', '');
    moreInfoRequest(start, showmore, failSearch);
    personInfoRequest(start, showPersonDetail, failSearch);
});