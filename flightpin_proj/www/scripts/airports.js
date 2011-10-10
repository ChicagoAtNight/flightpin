/** Places markers on airport locations **/

var map = null;
var geocoder = null;

//  Canadian Airports

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var CAN_content = [
		      '<div class="infobubble"><p>Calgary International Airport (<a href="../airport_code.htm">IATA Code</a>: YYC) is Canada\'s fourth busiest airport by passenger traffic until 2008. In 2009 Calgary International overtook Montréal-Trudeau International. In 2008 Calgary International served 12.5 million travelers. (<a href="http://www.yyc.com/" target="_top">source</a>)<br />(<a href="google_map_Calgary.htm">Click for a location map for Calgary International Airport</a>)</p></div>',
		      '<div class="infobubble"><p>formerly Montréal–Dorval International Airport (<a href="../airport_code.htm">IATA Code</a>: YUL) serves Québec, Atlantic Canada as well as Eastern Ontario and Northern New England, it is the third busiest airport in Canada until 2008. The airport has handled 12.8 million passengers in 2008. (<a href="http://www.admtl.com/a_propos/salle_de_presse/statistics.aspx" target="_top">source</a>)<br /><a href="google_map_Montreal.htm">Location map for Montreal International Airport</a></p></div>',
		      '<div class="infobubble"><p>Ottawa Macdonald-Cartier International Airport (<a href="../airport_code.htm">IATA Code</a>: YOW) one of the main international airports in Canada with 4.3 million passengers in 2008. (<a href="http://www.ottawa-airport.ca/Newsroom/annualReports-e.php" target="_top">source</a>)<br /><a href="google_map_Ottawa.htm">Location map for Ottawa International Airport</a></p></div>',
		      '<div class="infobubble"><p>Jean Lesage International Airport (<a href="../airport_code.htm">IATA Code</a>: YQB) is the second busiest passenger airport in Quebec province with 1 million passengers in 2008. (<a href="http://www.aeroportdequebec.com/Html/en-ca/PublishedDocuments.shtml" target="_top">source</a>)<br /><a href="google_map_Ottawa.htm">Location map for Ottawa International Airport</a></p></div>',
		      '<div id ="infobubble"><b>Toronto Lester B. Pearson International Airport</b>Pearson International (<a href="../airport_code.htm">IATA code</a>: YYZ) is Toronto\'s major international airport serving Toronto, Ontario, Canada, situated 27 km (17 mi) west-northwest of Downtown Toronto in the city of Mississauga. It is the busiest airport in Canada with a total passenger volume of 25 million travelers in 2008. (<a href="http://www.gtaa.com/" target="_top">source</a>)<br /><a href="google_map_Toronto.htm">Location map for Toronto International Airport</a></div>',
		      '<div class="infobubble"><b>Vancouver International (<a href="../airport_code.htm">IATA Code</a>: YVR) </b>is located on Sea Island in Richmond, it is the second busiest airport in Canada (behind <a href="google_map_Toronto.htm">Toronto Pearson International Airport</a>) with a passenger volume of 17.9 million travelers in 2008. (<a href="http://wwwnew.yvr.ca/en/about/facts-stats.aspx" target="_top">source</a>)<br /><a href="google_map_Vancouver.htm">Location map for Vancouver International Airport</a></div>'];

var CAN_airports = [
		['Calgary Int\'lAirport', 'YYC', 51.1164, -114.0054, 1, CAN_content[0]],
		['Montréal-Pierre Elliott Trudeau Int\'l Airport','YUL', 45.4576, -73.7496, 2, CAN_content[1]],
		['Ottawa Macdonald-Cartier Int\'l Airport', 'YOW', 45.3229, -75.6686, 3, CAN_content[2]],
		['Quebéc Jean Lesage Int\'l Airport', 'YQB', 46.7919, -71.3839, 4, CAN_content[3]],
		['Toronto Lester B. Pearson Int\'l Airport', 'YYZ', 43.67628, -79.60628, 5, CAN_content[4]],
		['Vancouver Int\'l Airport', 'YVR', 49.1925, -123.1751, 6, CAN_content[5]]
];


//  United States Airports


var US_content = [ '<div class="infobubble"><b>Hartsfield–Jackson Atlanta International Airport</b> (<a href="../airport_code.htm">IATA code</a>: ATL) the world\'s busiest airport by passenger traffic, serving 90 million passengers per year (2008). The Airport is located seven miles (11 km) south of the central business district of Atlanta. (<a href="http://www.airports.org/cda/aci_common/display/main/aci_content07_c.jsp?zn=aci&cp=1-5-54-55_666_2__" target="_top">source</a>)<br /><a href="google_map_Atlanta.htm">Location map for Atlanta International Airport</a></div>',
		   '<div class="infobubble"><b>Austin International Airport</b>Austin-Bergstrom International Airport (<a href="../airport_code.htm">IATA code</a>: AUS) is a mixed-use commercial domestic airport, served 9 million passengers in 2008.<br /><a href="google_map_Austin.htm">Location map for Austin International Airport</a></div>',
		   '<div class="infobubble"><b>Baltimore-Washington International Airport</b>Thurgood Marshall Airport, commonly called BWI, BWI Airport or BWI-Marshall (<a href="../airport_code.htm">IATA code</a>: BWI) is a commercial airport serving the Baltimore-Washington Metropolitan Area, the airport has served more than 20 million passengers in 2008.<br /><a href="google_map_Baltimore.htm">Location map for Baltimore International Airport</a></div>',
		   '<div class="infobubble"><b>Boston International Airport</b>Boston Logan Airport (<a href="../airport_code.htm">IATA code</a>: BOS) serves domestic destinations as well as international destinations in Canada, the Cape Verde Islands, the Caribbean, Europe, and Mexico. In 2008 the airport handled 26 million passengers.<br /><a href="google_map_Boston.htm">Location map for Boston International Airport</a></div>',
		   '<div class="infobubble"><b>Charlotte International Airport</b> (<a href="../airport_code.htm">IATA code</a>: CLT) is a joint civil-military public international airport and currently US Airways\' largest hub. In 2008 the airport served almost 35 million passengers.<br /><a href="google_map_Charlotte.htm">Location map for Charlotte International Airport</a></div>',
		   '<div class="infobubble"><b>Chicago Midway Airport</b>Midway Airport (<a href="../airport_code.htm">IATA code</a>: MDW) is Chicago\'s municipal airport (17.3 million passengers in 2008)<br /><a href="google_map_Chicago.htm">Location map for Chicago Midway Airport</a>.</div>',
		   '<div class="infobubble"><b>Chicago O\'Hare International</b>O\'Hare International (<a href="../airport_code.htm">IATA code</a>: ORD) has been voted the "Best Airport in North America" for 10 years. O\'Hare International Airport is the second busiest airport in the world (almost 70 million passengers in 2008)<a href="http://www.airports.org/cda/aci_common/display/main/aci_content07_c.jsp?zn=aci&cp=1-5-54-55_666_2__" target="_top">*</a>, behind <a href="google_map_Atlanta.htm">Atlanta</a>\'s Hartsfield–Jackson Airport.<br /><a href="google_map_Chicago.htm">Location map for Chicago O\'Hare International</a></div>'
];

var US_airports = [
		['Hartsfield-Jackson Atlanta Int\'l Airport', 'ATL', 33.639975, -84.4440, 1, US_content[0]],
		['Austin-Bergstrom Int\'l Airport','AUS', 30.2026, -97.6681, 2, US_content[1]],
		['Baltimore Thurgood Marshall Int\'l Airport', 'BWI', 39.1752, -76.6683, 3, US_content[2]],
		['Boston Logan Int\'l Airport', 'BOS', 42.3644, -71.0052, 4, US_content[3]],
		['Charlotte Int\'l Airport', 'CLT', 35.2209, -80.9442, 5, US_content[4]],
		['Chicago Midway Airport', 'MDW', 41.7908, -87.7479, 6, US_content[5]],
		['Chicago O\' Hare Int\'l Airport', 'ORD', 41.97340, -87.901846, 7, US_content[6]]
];

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = new google.maps.MarkerImage('www/images/marker-pin.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      new google.maps.Size(40, 32),
      // The origin for this image is 0,0.
      new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      new google.maps.Point(0, 32));
  var shadow = new google.maps.MarkerImage('www/images/marker-shadow.png',
      // The shadow  image is larger in the horizontal dimension
      // while the position and offset are the same as for the main image.
      new google.maps.Size(60, 60),
      new google.maps.Point(0,0),
      new google.maps.Point(0, 32));
      // Shapes define the clickable region of the icon.
      // The type defines an HTML <area> element 'poly' which
      // traces out a polygon as a series of X,Y points. The final
      // coordinate closes the poly by connecting to the first
      // coordinate.
  var shape = {
      coord: [1, 1, 1, 40, 25, 40, 25 , 1],
      type: 'poly'
  };

  var infowindow = new google.maps.InfoWindow();
  for (var i = 0; i < locations.length; i++) {
    var airport = locations[i];
    var count = 0; // count of how many double clicks ocurred
    var myLatLng = new google.maps.LatLng(airport[2], airport[3]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        shadow: shadow,
        icon: image,
        shape: shape,
        title: airport[0],
        zIndex: airport[4],
	IATA: airport[1],
	content: airport[5]
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
		return function() {
		    infowindow.setContent('<div class="infobox">'+marker.title+' ('+marker.IATA+')'+'</div>');
		    infowindow.open(map, marker);
		}
	    })(marker, i));

    google.maps.event.addListener(marker, 'dblclick', (function(marker, i) {
		return function() {
		    infowindow.setContent(marker.content);
		    infowindow.open(map, marker);
		    marker.setIcon('www/images/green-pin.png');
		    count += 1;
		    if (count > 2)
			initialize();
		}
	    })(marker, i));
  }
}
