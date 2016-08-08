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
    var path;

    var x = d3.scaleLinear()
        .range([0, w])
        .domain(d3.extent(data, (d) => d.x1));
    var y = d3.scaleLinear()
        .range([h - 100, 100])
        .domain(d3.extent(data, (d) => d.y1));

    var valueline = d3.line()
        .y((d) => y(d.y1))
        .x((d) => x(d.x1));

    svg
        .append('linearGradient')
        .attr('id', 'temperature-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', y(300))
        .attr('x2', 0)
        .attr('y2', y(400))
    .selectAll('stop')
      .data([
        { offset: '0%', color: 'red' },
        { offset: '20%', color: 'orange' },
        { offset: '40%', color: 'yellow' },
        { offset: '60%', color: 'green' },
        { offset: '80%', color: 'blue' },
        { offset: '100%', color: 'purple' },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);
    path = svg.append('path')
        .datum(data)
        .style('stroke-width', 8)
        .style('stroke-linecap', 'butt')
        .style('stroke-linejoin', 'round')
        .attr('class', 'line')
        .attr('d', valueline);

    path.attr('stroke-dasharray', `${path.node().getTotalLength()} ${path.node().getTotalLength()}`)
        .attr('stroke-dashoffset', path.node().getTotalLength())
        .transition()
        .duration(2000)
        .attr('stroke-dashoffset', 0);
}

function setupGraph(id, w, h) {
    d3.csv('data.csv',
            (d) => {
                return {
                    x1: +d.x1,
                    y1: +d.y1,
                };
            },
            (error, data) => plotData(data, id, w, h)
    );
}

setupGraph('#arbitrary', 1000, 600);
