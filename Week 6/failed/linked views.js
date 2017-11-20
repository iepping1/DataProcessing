// sets the size of the canvas
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 400 - margin.left - margin.right,
	height = 220 - margin.top - margin.bottom;

// parses the dates into days, months and years
var formatDate = d3.time.format("%Y%m%d"),
    bisectDate = d3.bisector(function(d) { return d.Date; }).left;

// sets scales of x and y
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);

// defines the axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
//	.orient("bottom").ticks(5);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// defines the lines of tempmax, tempmin and average temp
var line = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Tempmin); });

// define the 2nd line
var line2 = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.TempG); });

// define the 2nd line
var line3 = d3.svg.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Tempmax); });

// creates the first canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// queues the data
queue()
	.defer(d3.json, 'schiphol.json')
	.defer(d3.json, 'debilt.json')
	.await(ReadData);

// loads the schiphol data
function ReadData(error, data1, data2) {
    data1.forEach(function(d) {
        d.Date = formatDate.parse(d.Date);
        d.Tempmin = +d.Tempmin;
        d.Tempmax = +d.Tempmax;
        d.TempG = +d.TempG;
        d.Tempmin = d.Tempmin / 10;
		d.Tempmax = d.Tempmax / 10;
		d.TempG = d.TempG / 10;
    });

    // scales the range to the data
    x.domain(d3.extent(data1, function(d) { return d.Date; }));
    y.domain([d3.min(data1, function(d) {return Math.min(d.Tempmax, d.Tempmin, d.TempG); }),
              d3.max(data1, function(d) {return Math.max(d.Tempmax, d.Tempmin, d.TempG); })]);

    // loads the DeBilt data
    data2.forEach(function(d) {
        d.Date = formatDate.parse(d.Date);
        d.Tempmin = +d.Tempmin;
        d.Tempmax = +d.Tempmax;
        d.TempG = +d.TempG;
        d.Tempmin = d.Tempmin / 10;
		d.Tempmax = d.Tempmax / 10;
		d.TempG = d.TempG / 10;
    });

	// scales the range to the data
    x.domain(d3.extent(data2, function(d) { return d.Date; }));
    y.domain([d3.min(data2, function(d) {return Math.min(d.Tempmax, d.Tempmin, d.TempG); }),
              d3.max(data2, function(d) {return Math.max(d.Tempmax, d.Tempmin, d.TempG); })]);

	// draws the X axis
    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // draws the Y Axis
    svg.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 5)
        .attr("dy", "0.71em")
        .attr("fill", "#000")
        .text("Temp (Celsius)");

    // writes the title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .text("Temperatures of the year so far");

    // draws the legend
    svg.append("text")
        .attr("x", width + 25)
        .attr("y", height - margin.top - 120 )
        .attr("class", "legend")
        .style("fill", "steelblue")
        .on("click", function(){
            // Determine if current line is visible
            var active1   = SLine.active1 ? false : true,
            newOpacity1 = active1 ? 0 : 1;
            // Hide or show the elements
            d3.select("#SLine").style("opacity", newOpacity1);
            // Update whether or not the elements are active
            SLine.active1 = active1;
        })
        .text("Min Temp");

    svg.append("text")
        .attr("x", width + 25)
        .attr("y", height - margin.top - 160 )
        .attr("class", "legend")
        .style("fill", "green")
        .on("click", function(){
            // Determine if current line is visible
            var active2   = S2Line.active2 ? false : true,
            newOpacity2 = active2 ? 0 : 1;
            // Hide or show the elements
            d3.select("#S2Line").style("opacity", newOpacity2);
            // Update whether or not the elements are active
            S2Line.active2 = active2;
        })
        .text("Average Temp");

    svg.append("text")
        .attr("x", width + 25)
        .attr("y", height - margin.top - 200 )
        .attr("class", "legend")
        .style("fill", "red")
        .on("click", function(){
            // Determine if current line is visible
            var active3   = S3Line.active3 ? false : true,
            newOpacity3 = active3 ? 0 : 1;
            // Hide or show the elements
            d3.select("#S3Line").style("opacity", newOpacity3);
            // Update whether or not the elements are active
            S3Line.active3 = active3;
        })
        .text("Max Temp");

	// draws the original chart
	DrawChart(data1);

    // changes to the second chart
    d3.select("#button1").on('click', function() {
        DrawChart(data2);
    });

    d3.select("#button2").on('click', function() {
        DrawChart(data1);
    });

    function DrawChart(data) {
        d3.selectAll("path.line").remove();

        // draws the lines
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("id", "SLine")
            .attr("d", line);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "green")
            .attr("id", "S2Line")
            .attr("d", line2);

        svg.append("path")
            .data([data])
            .attr("class", "line")
            .style("stroke", "red")
            .attr("id", "S3Line")
            .attr("d", line3);

        var focus1 = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus1.append("circle")
            .attr("r", 4.5)
            .style("stroke", "black")
            .style("fill", "steelblue");

        focus1.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        var focus2 = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus2.append("circle")
            .attr("r", 4.5)
            .style("stroke", "black")
            .style("fill", "green");

        focus2.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        var focus3 = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus3.append("circle")
            .attr("r", 4.5)
            .style("stroke", "black")
            .style("fill", "red");

        focus3.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() {
                focus1.style("display", null);
                focus2.style("display", null);
                focus3.style("display", null);
            })
            .on("mouseout", function() {
                focus1.style("display", "none");
                focus2.style("display", "none");
                focus3.style("display", "none");
            })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus1.attr("transform", "translate(" + x(d.Date) + "," + y(d.Tempmin) + ")");
            focus1.select("text").text(d.Tempmin);
            focus2.attr("transform", "translate(" + x(d.Date) + "," + y(d.TempG) + ")");
            focus2.select("text").text(d.Tempmin);
            focus3.attr("transform", "translate(" + x(d.Date) + "," + y(d.Tempmax) + ")");
            focus3.select("text").text(d.Tempmax);
        }
    }
}

//$ python -m http.server 8080