import React, { useEffect, useState } from "react";
import "./App.css";

import { FaHeart } from "react-icons/fa";
import { select } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { extent } from "d3-array";
import { csvParse } from "d3-dsv";
import "d3-transition";

function plotData(data, id, width, height) {
  var svg = select(id)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("id", "visualization")
    .attr("xmlns", "http://www.w3.org/2000/svg");
  var path;

  var x = scaleLinear()
    .range([0, width])
    .domain(extent(data, d => d.x1));

  var y = scaleLinear()
    .range([height - 100, 100])
    .domain(extent(data, d => d.y1));

  var valueline = line()
    .y(d => y(d.y1))
    .x(d => x(d.x1));

  svg
    .append("linearGradient")
    .attr("id", "temperature-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", y(300))
    .attr("x2", 0)
    .attr("y2", y(400))
    .selectAll("stop")
    .data([
      { offset: "0%", color: "red" },
      { offset: "20%", color: "orange" },
      { offset: "40%", color: "yellow" },
      { offset: "60%", color: "green" },
      { offset: "80%", color: "blue" },
      { offset: "100%", color: "purple" },
    ])
    .enter()
    .append("stop")
    .attr("offset", d => d.offset)
    .attr("stop-color", d => d.color);
  path = svg
    .append("path")
    .datum(data)
    .style("stroke-width", 8)
    .style("stroke-linecap", "butt")
    .style("stroke-linejoin", "round")
    .attr("class", "line")
    .attr("d", valueline);

  path
    .attr(
      "stroke-dasharray",
      `${path.node().getTotalLength()} ${path.node().getTotalLength()}`
    )
    .attr("stroke-dashoffset", path.node().getTotalLength())
    .transition()
    .duration(2000)
    .attr("stroke-dashoffset", 0);
}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function App() {
  const [img, setImg] = useState();
  useEffect(() => {
    async function setup() {
      const result = await fetch("data.csv");
      const data = await result.text();
      const csv = csvParse(data, d => {
        return {
          x1: +d.x1,
          y1: +d.y1,
        };
      });
      plotData(csv, "#arbitrary", 1000, 600);
    }
    setup();
  }, []);
  return (
    <div className="App">
      <img
        alt="background"
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        src={
          img ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Night_Panorama_Miami_Florida_5462.jpg/2560px-Night_Panorama_Miami_Florida_5462.jpg"
        }
      />
      <div
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
        id="arbitrary"
      />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
        <a href="https://github.com/cmdcolin/pulse_tribute">
          <FaHeart />
        </a>
        <input
          type="file"
          onChange={async e => {
            const f = e.target.files[0];
            const img = await readFileAsync(f);
            console.log({ img });
            setImg(img);
          }}
        />
      </div>
    </div>
  );
}

export default App;
