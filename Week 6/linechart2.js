// sets dimensions of the canvas
var marginline = {top: 40, right: 10, bottom: 20, left: 50},
    width = 550 - marginline.left - marginline.right,
    height = 500 - marginline.top - marginline.bottom;

// parses the dates into days, months and years
var formatDate = d3.time.format("%Y");

// sets scales of x and y
var	x = d3.time.scale().range([marginline.left, width]);
	y = d3.scale.linear().range([height, 0]);

// defines the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
	//.ticks(5)
	.tickFormat(function(d) {
		return formatDate(d);
	});

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// Setting x position for line labels
var xLabel = width;

// Create the Line Generator
var line = d3.svg.line()
    .x(function(d) {return x(formatDate.parse(d.years)); })
    .y(function(d) {return y(+d.social); });

// creates the first canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + marginline.left + marginline.right)
    .attr("height", height + marginline.top + marginline.bottom)
    .append("g")
    .attr("transform", "translate(" + marginline.left + "," + marginline.top + ")");

// global variable
var dataset;

// for linked hovering
var activeCountry;

// loads the data
d3.json("unhappy2.json", function(error, data) {
	console.log(JSON.stringify(data, null, 2));

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

    //data.forEach(function(d) {
    //d.years = formatDate.parse(d.years);
    //d.support = +d.support;

    // defines the lines of tempmax
    //var line = d3.svg.line()
    //.x(function(d) { return x(d.Date); })
    //.y(function(d) { return y(d.Tempmax); });

    // scales the range to the data
    //x.domain(d3.extent(data1, function(d) { return d.Date; }));
    //y.domain([d3.min(data1, function(d) {return Math.min(d.Tempmax, d.Tempmin, d.TempG); }),
    //          d3.max(data1, function(d) {return Math.max(d.Tempmax, d.Tempmin, d.TempG); })]);

	x.domain([
		d3.min(years, function(d) {return formatDate.parse(d);}),
		d3.max(years, function(d) {return formatDate.parse(d);})
	]);	  
	
	y.domain([
		d3.max(dataset, function(d) {return d3.max(d.social, function(d) {return +d.support;});
    }),
    0
    ]);
	
	// Make a group for each country
	var groups = svg.selectAll("g")
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
			var xPosition = wLine/2 + 35;
			var yPosition = marginLine.top - 10;

			svg.append("text")
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
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			//.attr("transform", "rotate(-90)")
			.attr("transform", "translate(" + (marginLine.left) + ",0)")
			.attr("x", 0 - marginLine.left)
			.attr("y", marginLine.top - 10)
			.attr("dy", "0.71em")
			.attr("fill", "#000")
			.style ("text-anchor", "start")
			.text("Level of Social Support in ");

        //Labels for highlighted lines
        svg.append("text")
          .attr("transform", "translate(" + xLabel + ", " + y(data[20][years[4]]) + ")")
          .attr("dy", ".15em")
          .attr("dx", ".25em")
          .attr("text-anchor", "start")
          .attr("class","labelNation")
          .text( + data[25][years[5]] );
		  
		// writes the title
		svg.append("text")
			.attr("x", (width / 2))
			.attr("y", 0 - (margin.top / 2))
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.style("text-decoration", "underline")
			.text("Social support of European Countries");

});
//$ python -m http.server 8080