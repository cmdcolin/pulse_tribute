var d3 = require('d3');

function svgr(id, w, h) {
    return d3.select(id)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualization')
        .attr('xmlns', 'http://www.w3.org/2000/svg');
}

function plotData(data, id, w, h) {
    var svg = svgr(id, w, h);
    var x;
    var y;

    x = d3.scale.linear().range([0, w]).domain(d3.extent(data, (d) => d.x1));
    y = d3.scale.linear().range([h, 0]).domain(d3.extent(data, (d) => d.y1));

    var valueline = d3.svg.line()
        .interpolate('linear')
        .y((d) =>  y(d.y1))
        .x((d) =>  x(d.x1));

    var path = svg.append('path')
        .attr('d', valueline(data))
        .attr('stroke', 'steelblue')
        .attr('stroke-width', '2')
        .attr('fill', 'none');


    var totalLength = path.node().getTotalLength();
    path
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(2000)
        .ease('linear')
        .attr('stroke-dashoffset', 0);
}

function setupGraph(id, w, h) {
    d3.csv('data.csv', function(d) {
        return {
            x1: +d.x1,
            y1: +d.y1
        };
    }, function(error, data) {
        console.log(data);
        plotData(data, id, w, h);
    });
}

setupGraph("#arbitrary",1000,600);
