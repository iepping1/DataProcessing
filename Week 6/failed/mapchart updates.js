
// second version with choropleth and pathlight removed
		done: function(datamap) {
			datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
				var country_id = geography.id;
				var fillkey_obj = datamap.options.data[country_id] || {fillKey: 'defaultFill'};
				var fillkey = fillkey_obj.fillKey;;
				var fillkeys = Object.keys(fills);
				var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
				var new_fills = {
					[geography.id] : {
						fillKey: antikey
					}
				};
				datamap.updateChoropleth(new_fills);

				activeCountry = datamap.Country;
																						
				linechart.selectAll("g")
					.each(function(datamap) {
						if(datamap){
							if ( datamap.Country == activeCountry ){
								d3.select(this).select("path");
								return true;							
							}
							else{
								return false;
						}
					}
				})
			})
			datamap.svg.selectAll('.datamaps-subunit').on('mouseout', function(geography) {
				d3.selectAll("path")
				d3.select("#hoverLabel").remove();	 
				
				var m = {};
				m[geography.id] = '#00446A';
				datamap.updateChoropleth(m);
			});
		}
	});	
}
		


// first link, linechart glitches out (with proper definitions)
		done: function(datamap) {
			datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
				var state_id = geography.id;
				activeCountry = datamap.Country;
																						
				linechart.selectAll("g")
					.each(function(datamap) {
						if(datamap){
							if ( datamap.Country == activeCountry ){
								
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
			datamap.svg.selectAll('.datamaps-subunit').on('mouseout', function(geography) {
				d3.selectAll("path")
				.attr("class", "pathBase");
				d3.select("#hoverLabel").remove();	 
			});
		}
	});	
}

// update with alert info

		
		done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
				var countryName = geography.properties.name;
				alert(countryName);
            });
            datamap.svg.selectAll('.datamaps-subunit').on('mouseout', function(geography) {
                var countryName = geography.properties.name;
				alert(countryName);
            });
        }
	});	
}

+

// update with tooltip info, key is not defined
		
		done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
				var m = {};
				m[key] = {
					happiness: data[key].happiness,
					fillKey: data[key].fillKey,
					Country: data[key].country,
					selectedCountry: data[key].selectedCountry
				};
				map.updateChoropleth(m);
            });
        }
	});	
}



+

// higlight update first version, identifiers dont work

		done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
                var countryName = geography.properties.name;
                highlightMap(countryName);
            });
            datamap.svg.selectAll('.datamaps-subunit').on('mouseout', function(geography) {
                var countryName = geography.properties.name;
                highlightMap(countryName);
            });
        },
		
		function highlightMap(name, highlight) {
			var code = country2Code[name];

			if (highlight) {
				var countryElement = map.svg.select("#datamaps-subunit "+code);

				countryElement.attr('stroke-width', 10);
			}
		}	
	});
}

+

// update with choropleth, randomized colors
		done: function(datamap) {
			datamap.svg.selectAll('.datamaps-subunit').on('mouseover', function(geography) {
				var state_id = geography.id;
				var fillkey_obj = datamap.options.data[state_id] || {fillKey: 'defaultFill'};
				var fillkey = fillkey_obj.fillKey;;
				var fillkeys = Object.keys(fills);
				var antikey = fillkeys[Math.abs(fillkeys.indexOf(fillkey) - 1)];
				var new_fills = {
					[geography.id] : {
						fillKey: antikey
					}
				};
				datamap.updateChoropleth(new_fills);
			});
			datamap.svg.selectAll('.datamaps-subunit').on('mouseout', function(geography) {
				var m = {};
				m[geography.id] = '#00446A';
				datamap.updateChoropleth(m);
			});
		}
	});	
}