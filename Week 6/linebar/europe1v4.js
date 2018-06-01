// sets dimensions of the canvas
var marginline = {top: 40, right: 10, bottom: 20, left: 50},
    width = 850 - marginline.left - marginline.right,
    height = 800 - marginline.top - marginline.bottom;

// parses the dates into days, months and years
var formatDate = d3.timeParse("%Y");

// sets scales of x and y
var	xScaleLine = d3.scaleTime().range([marginline.left, width]);
	yScaleLine = d3.scaleLinear().range([height, 0]);

// defines the axes
var xAxisLine = d3.axisBottom(xScaleLine)
	.tickFormat(function(d) {
		return formatDate(d);
	});

var yAxisLine = d3.axisLeft(yScaleLine);

// Setting x position for line labels
var xLabel = width;

// Create the Line Generator
var line = d3.line()
    .x(function(d) {return xScaleLine(d3.timeParse(d.year)); })
    .y(function(d) {return yScaleLine(+d.support); });

// creates the first canvas
var linechart = d3.select("#europe1")
	.append("svg")
    .attr("width", width + marginline.left + marginline.right)
    .attr("height", height + marginline.top + marginline.bottom)
    .append("g")
    .attr("transform", "translate(" + marginline.left + "," + marginline.top + ")");

// global variable
var dataset;

// for linked hovering
var activeCountry;

// loads the data
d3.json("linebar/unhappy2.json", function(error, data) {

    // Create new array of all years in timeline for svg. Will be referenced later
    var years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016"];
	
	dataset = [];
	
	for (var i=0; i < data.length; i++) {
		//Create a new object with the country's name and empty array
		dataset[i] = {
			Country: data[i].Country,
			social: []
		};
		
		//Loop through all the years 
		for (var j = 0; j < years.length; j++) {

			//If value is empty
			if (data[i][years[j]]) {
				//Add a new object to the data array for that country
				dataset[i].social.push({
					year: years[j],
					support: data[i][years[j]]
				});
			}
		}
	}

	xScaleLine.domain([
		d3.min(years, function(d) {return d3.timeParse(d);}),
		d3.max(years, function(d) {return d3.timeParse(d);})
	]);	  
	
	yScaleLine.domain([
		d3.min(dataset, function(d) {
			return d3.min(d.social, function(d) {
				return +d.support;
			});
		}),
		d3.max(dataset, function(d) {
			return d3.max(d.social, function(d) {
				return +d.support;
			});
		}),
    ]);
	
	// Make a group for each country
	var groups = linechart.selectAll("g")
		.data(dataset)
		.enter()
		.append("g")
		.classed("national", function(d) {
			if (d.Country == "United Kingdom") 
				return true;
			else return false;
		})
		.on("mouseover", function(d) {

			activeCountry = d.Country;

			// Setting position for the country label
			var xPosition = (width + marginline.left + marginline.right)/2 + 35;
			var yPosition = marginline.top - 10;

			linechart.append("text")
			.attr("id", "hoverLabel")
			.attr("x", xPosition)
			.attr("y", yPosition)
			.attr("text-anchor", "start")
			.attr("font-family", "ff-nuvo-sc-web-pro-1,ff-nuvo-sc-web-pro-2, sans-serif") 
			.attr("font-size", "20px")
			.text(activeCountry); 

			d3.selectAll("rect")
			.classed("barLight", function(d) {
				if ( d.Country == activeCountry) return true;
				else return false;
			});
		})
		.on("mouseout", function() {
        d3.select("#hoverLabel").remove();

        d3.selectAll("rect")
        .attr("class", "barBase");
		})

		// Append a title with the Country name (for easy tooltips)
		 groups.append("title")
			.text(function(d) {
				return d.Country;
			});
		
		//console.log(JSON.stringify(data, null, 2));
		//Create new line within each group
		groups.selectAll("path")
			.data(function(d) {
				return [ d.social ];
			})
			.enter()
			.append("path")
			.attr("class", "line")
			.attr("d", line);

		// draws the axes
		linechart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxisLine);
		
		linechart.append("g")
			.attr("class", "y axis")
			.call(yAxisLine)
			//.append("text")
			//.attr("transform", "rotate(-90)")
			//.attr("transform", "translate(" + (marginline.left) + ",0)")
			//.attr("x", 60 - marginline.left)
			//.attr("y", marginline.top - 60)
			//.attr("dy", "0.71em")
			//.attr("fill", "#000")
			//.style ("text-anchor", "start")
			//.text("Level of Social Support in ");

        //labels for highlighted lines
        linechart.append("text")
			.attr("transform", "translate(" + xLabel + ", " + yScaleLine(data[20][years[4]]) + ")")
			.attr("dy", ".15em")
			.attr("dx", ".25em")
			.attr("text-anchor", "start")
			.attr("class","labelNation")
			.text( + data[25][years[5]] );
		  
		// writes the title
		linechart.append("text")
			.attr("x", (width / 2))
			.attr("y", 0 - (marginline.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.style("text-decoration", "underline")
			.text("Social support of European Countries");

});
//$ python -m http.server 8080