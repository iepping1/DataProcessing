d3.json("2017.json", function(data) {
    console.log(JSON.stringify(data, null, 2));
});

// sets dimensions of the canvas
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// sets scales of x and y
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

// defines the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
    
// create new tooltip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Rainfall:</strong> <span style='color:red'>" + d.Rain + "</span>";
  });

// creates the canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// loads the data from the KNMI site
d3.json("2017.json", function(error, data) {
    data.forEach(function(d) {
        d.Date = d.Date;
        d.Rain = +d.Rain;
});

svg.call(tip);

    // scales the range to the data
    x.domain(data.map(function(d) { return d.Date; }));
    y.domain([0, d3.max(data, function(d) { return d.Rain; })]);
    
    // draws the axes and adds the text
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );
    
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Rain in mm");
    
    // draws the bar chart
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Date); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.Rain); })
        .attr("height", function(d) { return height - y(d.Rain); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
});