window.onload = function() {

	var map = new Datamap({
		scope: "world",
		element: document.getElementById('container1'),
		projection: '', 
	    geographyConfig: {
			highlightOnHover: false,
			popupTemplate: function(geo, data) {
				return '<div class="hoverinfo">' + 'happiness of '
				+ geo.properties.name + ': ' +  data.happiness + ' '
			},
		},
		setProjection: function(element) {
			var projection = d3.geo.equirectangular()
				.center([10, 51])
				.rotate([4.4, 0])
				.scale(1500)
				.translate([element.offsetWidth / 2, element.offsetHeight / 2]);
			var path = d3.geo.path()
				.projection(projection);
			
			return {path: path, projection: projection};
		},	
        
		fills: {
          defaultFill: '#00446A',
          euphoric: 'rgba(0,244,244,0.9)',
		  happy: 'green',
		  okay: 'yellow',
          unhappy: 'red'
        },
        
        data: {
			"ALB": {
				"fillKey": "unhappy",
				"country": "Albania",
				"happiness": 4644
				},
			"AUT": {
				"fillKey": "euphoric",
				"country": "Austria",
				"happiness": 7006
				},	
			"DNK": {
				"fillKey": "euphoric",
				"country": "Denmark",
				"happiness": 7522
				},				
			"NOR": {
				"fillKey": "euphoric",
				"Country": "Norway", 
				"happiness": 7537
				},
			"ISL": {
				"fillKey": "euphoric",
				"Country": "Iceland", 
				"happiness": 7504
				},
			"CHE": {
				"fillKey": "euphoric",
				"Country": "Switzerland", 
				"happiness": 7494
				},
			"FIN": {
				"fillKey": "euphoric",
				"Country": "Finland", 
				"happiness": 7469
				},
			"SWE": {
				"fillKey": "euphoric",
				"Country": "Sweden", 
				"happiness": 7284
				},
			"IRL": {
				"fillKey": "happy",
				"Country": "Ireland", 
				"happiness": 6977
				},
			"DEU": {
				"fillKey": "happy",
				"Country": "Germany", 
				"happiness": 6951
				},
			"BEL": {
				"fillKey": "happy",
				"Country": "Belgium", 
				"happiness": 6891
				},
			"LUX": {
				"fillKey": "happy",
				"Country": "Luxembourg", 
				"happiness": 6863
				},
			"GBR": {
				"fillKey": "happy",
				"Country": "United Kingdom", 
				"happiness": 6714
				},
			"CZE": {
				"fillKey": "happy",
				"Country": "Czech Republic", 
				"happiness": 6609
				},
			"MLT": {
				"fillKey": "happy",
				"Country": "Malta", 
				"happiness": 6527
				},
			"FRA": {
				"fillKey": "happy",
				"Country": "France", 
				"happiness": 6442
				},
			"ESP": {
				"fillKey": "happy",
				"Country": "Spain", 
				"happiness": 6403
				},
			"SVK": {
				"fillKey": "happy",
				"Country": "Slovakia", 
				"happiness": 6098
				},
			"POL": {
				"fillKey": "happy",
				"Country": "Poland", 
				"happiness": 5973
				},
			"ITA": {
				"fillKey": "okay",
				"Country": "Italy", 
				"happiness": 5964
				},
			"ROU": {
				"fillKey": "okay",
				"Country": "Romania", 
				"happiness": 5825
				},
			"SVN": {
				"fillKey": "okay",
				"Country": "Slovenia", 
				"happiness": 5758
				},
			"CYP": {
				"fillKey": "okay",
				"Country": "Cyprus", 
				"happiness": 5621
				},
			"HUN": {
				"fillKey": "okay",
				"Country": "Hungary", 
				"happiness": 5324
				},
			"HRV": {
				"fillKey": "okay",
				"Country": "Croatia", 
				"happiness": 5293
				},
			"GRC": {
				"fillKey": "okay",
				"Country": "Greece", 
				"happiness": 5227
				},
			"PRT": {
				"fillKey": "okay",
				"Country": "Portugal", 
				"happiness": 5195
				},
			"BIH": {
				"fillKey": "okay",
				"Country": "Bosnia and Herzegovina", 
				"happiness": 5182
				},
			"MKD": {
				"fillKey": "okay",
				"Country": "Macedonia", 
				"happiness": 5175
				},
			"BGR": {
				"fillKey": "unhappy",
				"Country": "Bulgaria", 
				"happiness": 4714
				},
			"NLD": {
				"fillKey": "euphoric",
				"country": "Netherlands",
				"happiness": 7377
				}
		}
	});
}