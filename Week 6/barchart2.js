// sets dimensions of the canvas
var margin = {top: 0, right: 30, bottom: 50, left: 120},
    width = 800 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// sets scales of x and y
var x = d3.scale.linear()
		.range([0, width]);
	
var y = d3.scale.ordinal()
		.rangeRoundBands([0, height], .2);

// defines the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// creates the canvas
var barchart2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// for linked hovering
var activeCountry;

// loads the data from the KNMI site
d3.json("happyrain.json", function(error, data) {
    data.forEach(function(d) {
        d.Happiness = +d.Happiness;
        d.Country = d.Country;
});

    // scales the range to the data
    x.domain([5, d3.max(data, function(d) { return d.Happiness; })]);
    y.domain(data.map(function(d) { return d.Country; }));

    // draws the axes and adds the text
    barchart2.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.5em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    barchart2.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    // draws the bar chart
    barchart2.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left - 120)
	    .attr("y", function(d, i) { return y(d.Country);})
	    .attr("width", function(d) { return x(d.Happiness); })
		.attr("height",y.rangeBand)
	    .attr("class", "barBase")
	    .append("title")
		.text(function(d) {
			return d.Country + "'s Happiness score of 2017 is " + d.Happiness;
	});
    //rollover functionality
	barchart2.selectAll("rect")

		.on("mouseover", function(d) {

		activeCountry = d.Country;

		barchart1.selectAll("g").each(function(d) {
			if(d){
		        if ( d.Country == activeCountry ){
		        d3.select(this).select("path").classed("pathLight", true);

        		var xPosition = wLine/2 + 35;
        		    var yPosition = marginLine.top - 10;

        		    barchart1.append("text")
        			.attr("id", "hoverLabel")
        			.attr("x", xPosition)
        			.attr("y", yPosition)
				    .attr("text-anchor", "start")
				    .attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif")
				    .attr("font-size", "20px")
				    .text( activeCountry);

				return true;
				}
			else{
				return false;
			    }
			}
		});
		})

		.on("mouseout", function() {

			d3.selectAll("path")
			.attr("class", "pathBase");

			d3.select("#hoverLabel").remove();
	});
});