//SVG STYLE
<!DOCTYPE html>
<meta charset="utf-8">
<style>

// colors the rectangles
.chart rect {
  fill: steelblue;
}
 // sizes the font of the text
.chart text {
  fill: white;
  font: 10px sans-serif;
  text-anchor: end;
}

</style>
<svg class="chart"></svg>
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>

//example data
var data = [4, 8, 15, 16, 23, 42];

// sets the width and height 
var width = 420,
    barHeight = 20;

// scales the data based on its max value
var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

// sets the dimensions of the chart
var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

// appends text and rectangles for each bar
var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

</script>