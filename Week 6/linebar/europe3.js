// sets dimensions of the canvas
var marginBar = {top: 40, right: 30, bottom: 50, left: 120},
    width = 800 - marginBar.left - marginBar.right,
    height = 700 - marginBar.top - marginBar.bottom;

// sets scales of x and y
var xBarScale = d3.scale.linear()
		.range([0, width]);
	
var yBarScale = d3.scale.ordinal()
		.rangeRoundBands([0, height], .2);

// defines the axes
var xAxisBar = d3.svg.axis()
    .scale(xBarScale)
    .orient("bottom");

var yAxisBar = d3.svg.axis()
    .scale(yBarScale)
    .orient("left")
    .ticks(10);

// creates the canvas
var barchart = d3.select("#europe3")
	.append("svg")
    .attr("width", width + marginBar.left + marginBar.right)
    .attr("height", height + marginBar.top + marginBar.bottom)
    .append("g")
    .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

// for linked hovering
var activeCountry;

// loads the data
d3.json("linebar/unhappy.json", function(error, data) {
    data.forEach(function(d) {
        d.happiness = +d.happiness;
        d.Country = d.Country;
});

    // scales the range to the data
    xBarScale.domain([5, d3.max(data, function(d) { return d.happiness; })]);
    yBarScale.domain(data.map(function(d) { return d.Country; }));

    // draws the axes and adds the text
    barchart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxisBar)
    .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.5em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    barchart.append("g")
        .attr("class", "y axis")
        .call(yAxisBar)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

	// writes the title
	barchart.append("text")
		.attr("x", (width / 2))
		.attr("y", 0 - (marginBar.top / 2))
		.style("font-size", "20px")
		.attr("text-anchor", "middle")
		.style("text-decoration", "underline")
		.text("Happiness of European Countries in 2016");	

    // draws the bar chart
    barchart.selectAll("bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", marginBar.left - 120)
	    .attr("y", function(d, i) { return yBarScale(d.Country);})
	    .attr("width", function(d) { return xBarScale(d.happiness); })
		.attr("height",yBarScale.rangeBand)
	    .attr("class", "barBase")
	    .append("title")
		.text(function(d) {
			return d.Country + "'s happiness score of 2017 is " + d.happiness;
		
	});
			
    //rollover functionality
	barchart.selectAll("rect")

		.on("mouseover", function(d) {

		activeCountry = d.Country;

		linechart.selectAll("g")
		.each(function(d) {
			if(d){
		        if ( d.Country == activeCountry ){
		        d3.select(this).select("path").classed("pathLight", true);

				var xPosition = width/2 + 35;
        		    var yPosition = marginline.top - 10;

        		    linechart.append("text")
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
		})
		})

		.on("mouseout", function() {

			d3.selectAll("path")
			.attr("class", "pathBase");

			d3.select("#hoverLabel").remove();
	});
});