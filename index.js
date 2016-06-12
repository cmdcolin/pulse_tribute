var d3 = require('d3');
var pulse = {"version": 0.1 };



function svgr(id,w,h) {
    return d3.select(id)
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("id", "visualization")
        .attr("xmlns", "http://www.w3.org/2000/svg");
}



function plot_arbitrary(data, id,var1,var2,name1,name2,w,h) {
    var svg = svgr(id,w,h);
    var x, y; //scales
    
    x = d3.scale.linear().range([0,w-100]).domain(d3.extent(data, function (d) {
        return d[var1];
    }));

   
    y = d3.scale.linear().range([h-50, 0]).domain(d3.extent(data, function (d) {
        return d[var2];
    }));

    var valueline = d3.svg.line()
        .interpolate("cardinal")
        .y(function (d) {
            return y(d[var2]);
        })
        .x(function (d) {
            return x(d[var1])+100;
        });

    var path = svg.append("path")
        .attr("d", valueline(data))
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2")
        .attr("fill", "none");


    var totalLength = path.node().getTotalLength();
    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
}





function setup_graph(id,var1,var2,w,h,jsonfile) {
    var format = d3.time.format("%-m/%-d/%Y %H:%M:%S");
    d3.json(jsonfile, function(error, json) {
        if (error) {
            alert(error);
            return;
        }
        d3.csv(json.file, function (error, data) {
            var def = Object.keys(json.options);
            if (error) {
                alert(error);
                return;
            }
            data.forEach(function (d) {
                def.forEach(function(elt) { if(d[elt]) { d[elt] = parseFloat(d[elt]); } });
            });

            plot_arbitrary(data, id,uvar1,uvar2,uname1,uname2,w,h);
        });
    });
};

window.setup_graph = setup_graph;
