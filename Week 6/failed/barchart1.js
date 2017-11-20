// sets dimensions of the canvas
var marginline = {top: 40, right: 10, bottom: 20, left: 50},
    width = 550 - marginline.left - marginline.right,
    height = 500 - marginline.top - marginline.bottom;

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
    .orient("left");

// creates the canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + marginline.left + marginline.right)
    .attr("height", height + marginline.top + marginline.bottom)
    .append("g")
    .attr("transform", "translate(" + marginline.left + "," + marginline.top + ")");

// for linked hovering
var activeRain;

// loads the data
d3.json("happyrain.json", function(error, data) {
    data.forEach(function(d) {
        d.Rain = +d.Rain;
        d.Country = d.Country;
	});

    // scales the range to the data
    x.domain(data.map(function(d) { return d.Country; }));
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
        .text("Rainfall in 2014");

    // draws the bar chart
    svg.selectAll("bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
		.attr("y", marginline.bottom - 20)
		//.attr("y", function(d) { return y(d.Rain); })
		.attr("x", function(d, i) { return x(d.Country);})
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return height - y(d.Rain); })
		.attr("class", "barBase")
	    .append("title")
		.text(function(d) {
			return d.Country + "'s Rainfall of 2014 was " + d.Rain;
	});
});