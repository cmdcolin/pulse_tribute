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
    var x = d3.scale.linear().range([0, w]).domain(d3.extent(data, (d) => d.x1));
    var y = d3.scale.linear().range([h, 0]).domain(d3.extent(data, (d) => d.y1));

    var valueline = d3.svg.line()
        .interpolate('linear')
        .y((d) =>  y(d.y1))
        .x((d) =>  x(d.x1));

    svg.selectAll("path")
        .data(data)
        .enter().append('path')
        .attr('d', valueline(data))
        .style('fill', function(d) {console.log(d); return '#fff'; })
        .attr('stroke-width', '4')
        .style('stroke', function(d) { return 'blue'; })
    .selectAll("stop")
      .data([
        {offset: "0%", color: "steelblue"},
        {offset: "50%", color: "gray"},
        {offset: "100%", color: "red"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { console.log('h2',d);return d.offset; })
      .attr("stop-color", function(d) { return d.color; })

//
//    var path = svg.append('path')
//        .data(data)
//        .attr('d', valueline(data))
//        .attr('stroke-width', '4')
//        .attr('fill', 'none');
//
//    path.attr('stroke-dasharray', `${path.node().getTotalLength()} ${path.node().getTotalLength()}`)
//        .attr('stroke-dashoffset', path.node().getTotalLength())
//        .transition()
//        .duration(2000)
//        .ease('linear')
//        .attr('stroke', function(da) { console.log('hello2',da); return 'hsl(70,50%,50%)'; })
//        .attr('stroke-dashoffset', 0);
//    path2 = svg.selectAll('path');
//    path2.attr('stroke', function(r) { console.log(r); return 'black'; });
}

function setupGraph(id, w, h) {
    d3.csv('data.csv', function(d) {
        return {
            x1: +d.x1,
            y1: +d.y1
        };
    }, function(error, data) {
        plotData(data, id, w, h);
    });
}

setupGraph("#arbitrary",1000,600);
