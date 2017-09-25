// sets dimensions of the canvas
var width = 960,
    height = 1160;
	
// loads the projector
var projection = d3.geo.mercator()
    .center([5, 70 ])
    .scale(600)
	//.translate([width / 2, height / 2]);
    //.rotate([-180,0]);
	
var path = d3.geo.path()
    .projection(projection);
	
var color = d3.scale.linear()
			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

var legendText = ["8000-7000", "7000-6000", "6000-5000", "5000-4000"];

// creates the canvas
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
	
// append Div for tooltip to SVG
var div = d3.select("body")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);

var countries = svg.append("g");

// for linked hovering
var activeCountry;

// loads and displays Europe
d3.json("happy2017.json", function(error, data) {
	color.domain([0,1,2,3]);
	//var objects = uk.objects.subunits;
	//subunits = topojson.feature(uk, objects);
	////convert topjson objects to GeoJSON
  
	/*svg.append("path")
     .datum(topojson.feature(uk, uk.objects.subunits))
     .attr("d", path);*/
	 
	countries.selectAll('.country')
    .data(topojson.feature(data, data.objects.happy2017).features)
    .enter()
    .append("path")
	.attr("class", "country")
    .attr("d", path)
	return;
	
	countries.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
	.style("fill", function(d) {

	// Get data value
	var value = d.properties.visited;

	if (value) {
		//If value exists…
		return color(value);
	} 
	else {
		//If value is undefined…
		return "rgb(213,222,217)";
	}
	
		// Map the cities I have lived in!
	d3.csv("cities-lived.csv", function(data) {

	svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];
		})
		.attr("cy", function(d) {
			return projection([d.lon, d.lat])[1];
		})
		.attr("r", function(d) {
			return Math.sqrt(d.years) * 4;
		})
			.style("fill", "rgb(217,91,67)")	
			.style("opacity", 0.85)	

		// Modification of custom tooltip code provided by Malcolm Maclean, "D3 Tips and Tricks" 
		// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
		.on("mouseover", function(d) {      
			div.transition()        
			   .duration(200)      
			   .style("opacity", .9);      
			   div.text(d.place)
			   .style("left", (d3.event.pageX) + "px")     
			   .style("top", (d3.event.pageY - 28) + "px");    
		})   

		// fade out tooltip on mouse out               
		.on("mouseout", function(d) {       
			div.transition()        
			   .duration(500)      
			   .style("opacity", 0);   
		});
	});  
        
	// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
	var legend = d3.select("body").append("svg")
      			.attr("class", "legend")
     			.attr("width", 140)
    			.attr("height", 200)
   				.selectAll("g")
   				.data(color.domain().slice().reverse())
   				.enter()
   				.append("g")
     			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  	legend.append("rect")
   		  .attr("width", 18)
   		  .attr("height", 18)
   		  .style("fill", color);

  	legend.append("text")
  		  .data(legendText)
      	  .attr("x", 24)
      	  .attr("y", 9)
      	  .attr("dy", ".35em")
      	  .text(function(d) { return d; });
	});
	
});