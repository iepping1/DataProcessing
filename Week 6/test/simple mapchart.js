//Width and height
var w = 800;
var h = 600;

//Define map projection
var projection = d3.geo.mercator()
				.center([ 13, 52 ])
				.translate([ w/2, h/2 ])
				.scale([ w/1.5 ]);

//Define path generator
var path = d3.geo.path()
		.projection(projection);

//Create SVG
var svg = d3.select("#container")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

//Load in GeoJSON data
d3.json("countries.json", function(error, data) {
	console.log(JSON.stringify(data, null, 2));
				
	//Bind data and create one path per GeoJSON feature
	svg.selectAll("path")
		.data(data.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("stroke", "rgba(8, 81, 156, 0.2)")
		.attr("fill", "rgba(8, 81, 156, 0.6)");		
});