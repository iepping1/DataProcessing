// sets dimensions of the canvas
var marginBar = {top: 40, right: 30, bottom: 20, left: 120},
    width = 850 - marginBar.left - marginBar.right,
    height = 800 - marginBar.top - marginBar.bottom;

// sets scales of x and y
var xBarScale = d3.scaleLinear()
		.range([0, width]);
	
var yBarScale = d3.scaleBand()
		.range([0, height], .2);

// defines the axes
var xAxisBar = d3.axisBottom(xBarScale);

var yAxisBar = d3.axisLeft(yBarScale).ticks(10);

// creates the canvas
var barchart = d3.select("#europe3")
	.append("svg")
    .attr("width", width + marginBar.left + marginBar.right)
    .attr("height", height + marginBar.top + marginBar.bottom)
    .append("g")
    .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

// for linked hovering
var activeCountry;

var Data2017 = [];
var Data2018 = [];

function change(value){
	if(value === '2017')
	{
		update(Data2017);
	}
	else if(value === '2018')
	{
		update(Data2018);
	}
	console.log(JSON.stringify(Data2018, null, 2));
}

function update(data){

	// scales the range to the data
	xBarScale.domain([5, d3.max(data, function(d) { return d.happiness; })]);
	yBarScale.domain(data.map(function(d) { return d.Country; }));

		var bars = barchart.selectAll(".bar")
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
				return " The happiness score of " + d.Country + " in " + d.year + " is " + d.happiness;
			});
		
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
			.data(data)
			.attr("x", (width / 2))
			.attr("y", 0 - (marginBar.top / 2))
			.style("font-size", "20px")
			.attr("text-anchor", "middle")
			.style("text-decoration", "underline")
			.text(function(d) {
				return 	"Happiness of European Countries in " + d.year;
			})
	
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
	
	// joins the data
	bars.exit().remove().data(data)
}

// loads the data
d3.json("linebar/unhappier.json", function(error, data) {
    data.forEach(function(d) {
        d.happiness = +d.happiness;
        d.Country = d.Country;
		d.year = d.year;
	});

	for(var i = 0; i < data.length; i++){
		if(data[i]["year"] === "2017"){
			Data2017.push(data[i]);
		}else{
			Data2018.push(data[i]);
		}
	}
	
	//use 2018 to begin with
	update(Data2018);		
});