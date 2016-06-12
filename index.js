var d3 = require('d3');

function svgr(id, w, h) {
    return d3.select(id)
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('id', 'visualization')
        .attr('xmlns', 'http://www.w3.org/2000/svg');
}

function plotData(data, id, var1, var2, name1, name2, w, h) {
    var svg = svgr(id, w, h);
    var x;
    var y;

    x = d3.scale.linear().range([0, w]).domain(d3.extent(data, (d) => {
        return d[var1];
    }));


    y = d3.scale.linear().range([h, 0]).domain(d3.extent(data, (d) => {
        return d[var2];
    }));

    var valueline = d3.svg.line()
        .interpolate('cardinal')
        .y((d) => {
            return y(d[var2]);
        })
        .x((d) => {
            return x(d[var1]) + 100;
        });

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
    d3.csv('data.csv', (error, data) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);

        plotData(data, id, w, h);
    });
}

window.setupGraph = setupGraph;
