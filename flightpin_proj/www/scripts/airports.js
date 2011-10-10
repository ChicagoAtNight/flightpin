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
		      '<div class="infobox"><p>Calgary International Airport (<a href="../airport_code.htm">IATA Code</a>: YYC) is Canada\'s fourth busiest airport by passenger traffic until 2008. In 2009 Calgary International overtook Montréal-Trudeau International. In 2008 Calgary International served 12.5 million travelers. (<a href="http://www.yyc.com/" target="_top">source</a>)</p></div>',
		      '<div class="infobox"><p>formerly Montréal–Dorval International Airport (<a href="../airport_code.htm">IATA Code</a>: YUL) serves Québec, Atlantic Canada as well as Eastern Ontario and Northern New England, it is the third busiest airport in Canada until 2008. The airport has handled 12.8 million passengers in 2008. (<a href="http://www.admtl.com/a_propos/salle_de_presse/statistics.aspx" target="_top">source</a>)<br /></p></div>',
		      '<div class="infobox"><p>Ottawa Macdonald-Cartier International Airport (<a href="../airport_code.htm">IATA Code</a>: YOW) one of the main international airports in Canada with 4.3 million passengers in 2008. (<a href="http://www.ottawa-airport.ca/Newsroom/annualReports-e.php" target="_top">source</a>)<br /></p></div>',
		      '<div class="infobox"><p>Jean Lesage International Airport (<a href="../airport_code.htm">IATA Code</a>: YQB) is the second busiest passenger airport in Quebec province with 1 million passengers in 2008. (<a href="http://www.aeroportdequebec.com/Html/en-ca/PublishedDocuments.shtml" target="_top">source</a>)<br /></p></div>',
		      '<div id ="infobox"><b>Toronto Lester B. Pearson International Airport</b>Pearson International (<a href="../airport_code.htm">IATA code</a>: YYZ) is Toronto\'s major international airport serving Toronto, Ontario, Canada, situated 27 km (17 mi) west-northwest of Downtown Toronto in the city of Mississauga. It is the busiest airport in Canada with a total passenger volume of 25 million travelers in 2008. (<a href="http://www.gtaa.com/" target="_top">source</a>)<br /></div>',
		      '<div class="infobox"><b>Vancouver International (<a href="../airport_code.htm">IATA Code</a>: YVR) </b>is located on Sea Island in Richmond, it is the second busiest airport in Canada.</div>'
];

var CAN_airports = [
		['Calgary Int\'lAirport', 'YYC', 51.1164, -114.0054, 1, CAN_content[0]],
		['Montréal-Pierre Elliott Trudeau Int\'l Airport','YUL', 45.4576, -73.7496, 2, CAN_content[1]],
		['Ottawa Macdonald-Cartier Int\'l Airport', 'YOW', 45.3229, -75.6686, 3, CAN_content[2]],
		['Quebéc Jean Lesage Int\'l Airport', 'YQB', 46.7919, -71.3839, 4, CAN_content[3]],
		['Toronto Lester B. Pearson Int\'l Airport', 'YYZ', 43.67628, -79.60628, 5, CAN_content[4]],
		['Vancouver Int\'l Airport', 'YVR', 49.1925, -123.1751, 6, CAN_content[5]]
];


//  United States Airports


var US_content = [ '<div class="infobox"><b>Hartsfield–Jackson Atlanta International Airport</b> (<a href="../airport_code.htm">IATA code</a>: ATL) the world\'s busiest airport by passenger traffic, serving 90 million passengers per year (2008). The Airport is located seven miles (11 km) south of the central business district of Atlanta. (<a href="http://www.airports.org/cda/aci_common/display/main/aci_content07_c.jsp?zn=aci&cp=1-5-54-55_666_2__" target="_top">source</a>)<br /></div>',
		   '<div class="infobox"><b>Austin International Airport</b>Austin-Bergstrom International Airport (<a href="../airport_code.htm">IATA code</a>: AUS) is a mixed-use commercial domestic airport, served 9 million passengers in 2008.<br /></div>',
		   '<div class="infobox"><b>Baltimore-Washington International Airport</b>Thurgood Marshall Airport, commonly called BWI, BWI Airport or BWI-Marshall (<a href="../airport_code.htm">IATA code</a>: BWI) is a commercial airport serving the Baltimore-Washington Metropolitan Area, the airport has served more than 20 million passengers in 2008.<br /></div>',
		   '<div class="infobox"><b>Boston International Airport</b>Boston Logan Airport (<a href="../airport_code.htm">IATA code</a>: BOS) serves domestic destinations as well as international destinations in Canada, the Cape Verde Islands, the Caribbean, Europe, and Mexico. In 2008 the airport handled 26 million passengers.<br /></div>',
		   '<div class="infobox"><b>Charlotte International Airport</b> (<a href="../airport_code.htm">IATA code</a>: CLT) is a joint civil-military public international airport and currently US Airways\' largest hub. In 2008 the airport served almost 35 million passengers.<br /></div>',
		   '<div class="infobox"><b>Chicago Midway Airport</b>Midway Airport (<a href="../airport_code.htm">IATA code</a>: MDW) is Chicago\'s municipal airport (17.3 million passengers in 2008)</div>',
		   '<div class="infobox"><b>Chicago O\'Hare International</b>O\'Hare International (<a href="../airport_code.htm">IATA code</a>: ORD) has been voted the "Best Airport in North America" for 10 years. O\'Hare International Airport is the second busiest airport in the world (almost 70 million passengers in 2008)<a href="http://www.airports.org/cda/aci_common/display/main/aci_content07_c.jsp?zn=aci&cp=1-5-54-55_666_2__" target="_top">*</a>, behind </div>',
		   '<div class="infobox"><b>Cincinnati Int\'l Airport</b>Cincinnati/Northern Kentucky Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: CVG) serves the Greater Cincinnati metropolitan area. The airport handles almost 8 million passengers annualy.<br /></div>',
		   '<div class="infobox"><b>Cleveland Int\'l Airport</b>Cleveland Hopkins Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: CLE) is the largest airport in the Ohio. In 2008 the airport handled 8.7 million passengers. (<a href="http://www.clevelandairport.com/site/414/default.aspx" target="_top">source</a>)<br /></div>',
		   '<div class="infobox"><b>Port Columbus Int\'l Airport</b>Port Columbus (<a href="../airport_code.htm">IATA code</a>: CMH) is primarily a passenger  airport that serves central Ohio, with 3.8 million passengers in 2008.<br /></div>',
		   '<div class="infobox"><b>Dallas Int\'l Airport</b>Dallas/Fort Worth Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: DFW) is located between the cities of Dallas and Fort Worth, it is the third busiest airport in the world in terms of aircraft movements, annual passenger volume 28.6 million. It is the main hub for American Airlines.<br /></div>',
		   '<div class="infobox"><b>Denver Int\'l Airport</b>Denver Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: DEN) called DIA is the largest (by area) and a primary airport in the USA with an annual passenger volume of 23 million.<br /></div>',
		   '<div class="infobox"><b>Detroit Int\'l Airport</b>Detroit Metropolitan Wayne County Airport (<a href="../airport_code.htm">IATA code</a>: DTW) is a major international airport and a primary gateway to Asia with an annual passenger volume of 17.5 million, the airport is located in Romulus, a Detroit suburb.<br /></div>',
		   '<div class="infobox"><b>Hartford Int\'l Airport</b>Bradley Int\'l (<a href="../airport_code.htm">IATA code</a>: BDL) is Connecticut\'s busiest commercial airport, with 350 daily operations and an annual passenger volume of 6.1 million travelers.</div>',
		   '<div class="infobox"><b>Honolulu Int\'l Airport</b>Honolulu Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: HNL) is one of the busiest airports in the United States with an annual passenger volume of more than 20 million.</div>',
		   '<div class="infobox"><b>Houston Int\'l Airport</b>George Bush Intercontinental Airport (<a href="../airport_code.htm">IATA code</a>: IAH) is a Class B international airport serving the Greater Houston area it has served 41.7 million passengers in 2008.</div>',
		   '<div class="infobox"><b>William P. Hobby Airport</b>Hobby Airport (<a href="../airport_code.htm">IATA code</a>: HOU) is Houston\'s oldest commercial airport and was the city\'s primary air terminal until the opening of Houston Intercontinental Airport, it serves now as a secondary airport handling domestic services with an annual passenger volume of nearly 8.8 million in 2008.</div>',
		   '<div class="infobox"><b>Indianapolis Int\'l Airport</b>Indianapolis Int\'l (<a href="../airport_code.htm">IATA code</a>: IND) is the largest airport in Indiana, it has an annual passenger volume of 4 million. The airport is home of the second-largest FedEx operation hub in the world after .</div>',
		   '<div class="infobox"><b>Kansas City Int\'l Airport</b>a civilian airport (<a href="../airport_code.htm">IATA code</a>: MCI) ranked "3rd least miserable airport" in the United States. About 9-10 million passengers use this airport annually.<br /></div>',
		   '<div class="infobox"><b>Charles B. Wheeler Downtown Airport</b>known as Kansas City Downtown Airport (<a href="../airport_code.htm">IATA code</a>: MKC). The airport handles an annual passenger volume of 5.5 million.<br /></div>',
		   '<div class="infobox"><b>McCarran Int\'l Airport Las Vegas</b> (<a href="../airport_code.htm">IATA code</a>: LAS) the principal commercial airport serving Las Vegas and Clark County, located five miles (8 km) south of Las Vegas\' central business district. The airport has an annual passenger volume of 22 million.</div>',
		   '<div class="infobox"><b>Los Angeles Int\'l Airport</b> (<a href="../airport_code.htm">IATA code</a>: LAX) is the primary airport serving Los Angeles, located in southwestern Los Angeles in the neighborhood of Westchester. 17 million passengers use LAX annualy.</div>',
		   '<div class="infobox"><b>Memphis Int\'l Airport</b>Memphis Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: MEM) is a joint civil-military public airport. 5.5 million passengers are handled by Memphis Int\'l each year. Making it the busiest cargo airport is the fact that it is home to FedEx Express\'s global "SuperHub", and because of that Memphis Int\'l has the largest cargo operations by volume of any airport in the world." </div>',
		   '<div class="infobox"><b>Miami Int\'l Airport</b>also known as Wilcox Field, (<a href="../airport_code.htm">IATA code</a>: MIA) is the primary airport serving the Miami Metropolitan Area, it handles an annual passenger volume of 5.5 million with flights to cities in the U.S., Canada, Mexico, Central and South America, the Caribbeans, and Europe.</div>',
		   '<div class="infobox"><b>Minneapolis Airport</b> Minneapolis-Saint Paul Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: MSP) largest and busiest airport (17.2 million passengers yearly) in the five-state upper Midwest region.</div>',
		   '<div class="infobox"><b>Nashville Int\'l Airport</b><p>formerly known as Berry Field, Nashville, (<a href="../airport_code.htm">IATA code</a>: BNA) is a joint civil-military regional airport with some international flights to Canada. Yearly passenger volume is 4.8 million.</p></div>',
		   '<div class="infobox"><b>Louis Armstrong New Orleans Int\'l Airport</b><p>Armstrong Int\'l (<a href="../airport_code.htm">IATA code</a>: MSY) is the major commercial airport (3.1 million passengers annualy) for the New Orleans metropolitan area and southeast Louisiana.</p></div>',
		   '<div class="infobox"><b>LaGuardia Airport</b><p>LaGuardia Airport on Long Island (<a href="../airport_code.htm">IATA Code</a>: LGA) is New York\'s main airport for US domestic flights with a passenger volume of annual 13 million travelers.</p></div>',
		   '<div class="infobox"><b>John F. Kennedy Int\'l Airport</b><p>JFK Airport (<a href="../airport_code.htm">IATA Code</a>: JFK) primarily handles international flights with 21 million passenger enplanements.</p></div>',
		   '<div class="infobox"><b>Newark Int\'l Airport </b><p>Newark Liberty Int\'l (<a href="../airport_code.htm">IATA Code</a>: EWR) is situated in Newark, New Jersey, the airport handles domestic and international flights with annual almost 18 million passengers.</p></div>',
		   '<div class="infobox"><b>Oakland Int\'l Airport</b>also known as Metropolitan Oakland Int\'l Airport, (<a href="../airport_code.htm">IATA code</a>: OAK)  is a public airport located 4.6 mi (7.4 km) south of the central business district of Oakland, California. 11.5 million passengers used the airport.</div>',
		   '<div class="infobox"><b>Ontario Int\'l Airport</b>LA/Ontario Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: ONT) is a public airport located 2.3 mi (3.7 km) east of the central business district of Ontario, it is the second major airport (annual passenger volume 6.2 million) in the area after Los Angeles Int\'l Airport (LAX).</div>',
		   '<div class="infobox"><b>Orlando Int\'l Airport</b>Orlando Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: MCO) is the busiest airport in Florida with an annual volume of 16.8 million passengers (boarding) and 34 million total passengers.</div>',
		   '<div class="infobox"><b>Philadelphia Int\'l Airport</b>Philadelphia Int\'l (<a href="../airport_code.htm">IATA code</a>: PHL) is the only major airport serving the Philadelphia metropolitan area, bail out for 15.4 million boarding passengers and almost 32 million total passengers, handled in 2008.</div>',
		   '<div class="infobox"><b>Phoenix Int\'l Airport</b>Phoenix Sky Harbor Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: PHX) is a joint civil-military public airport and Arizona\'s largest and busiest airport with a total passenger volume of almost 40 million.</div>',
		   '<div class="infobox"><b>Pittsburgh Int\'l Airport</b>formerly Greater Pittsburgh Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: PIT) is a joint civil-military international airport located in the Pittsburgh suburb of Findlay Township. The airport handled a total passenger volume of 8.6 million in 2008 (<a href="http://www.pitairport.com/PIT_Airport_December_2008_Passenger_Traffic_Report" target="_top">source</a>).</div>',
		   '<div class="infobox"><b>Portland Int\'l Airport</b>Portland Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: PDX) is the largest airport in the U.S. state of Oregon. Total Enplaned and Deplaned Passengers: 13.27 million in 2008 (<a href="http://www.portofportland.com/Aviation_Stat.aspx" target="_top">source</a>)</div>',
		   '<div class="infobox"><b>Raleigh-Durham Int\'l Airport</b>Raleigh-Durham Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: RDU) provides direct service to predominantly domestic and some international destinations (Canada). A total of 9.7 million passengers traveled through RDU in 2008 (<a href="http://www.rdu.com/aboutrdu/stats.htm" target="_top">source</a>)</div>',
		   '<div class="infobox"><b>Sacramento Int\'l Airport</b>Sacramento Airport (<a href="../airport_code.htm">IATA code</a>: SMF) is a regional domestic airport with an annual passenger volume of 1o million, the only international destination from SMF is to Guadalajara, Mexico.</div>',
		   '<div class="infobox"><b>Salt Lake City Int\'l Airport</b>Salt Lake City Airport (<a href="../airport_code.htm">IATA code</a>: SLC) is a major public airport in Utah it has served 20.8 million passengers in 2008 (<a href="http://www.slcairport.com/air_traffic_stats.html" target="_top">source</a>).</div>',
		   '<div class="infobox"><b>San Antonio Int\'l Airport</b> (<a href="../airport_code.htm">IATA code</a>: SAT) is San Antonio\'s primary airport with a total number of passengers of 8,358,515 in 2008 (<a href="http://www.sanantonio.gov/AVIATION/info_fastfacts.asp" target="_top">source</a>).</div>',
		   '<div class="infobox"><b>San Diego Int\'l Airport</b> is also known as Lindbergh Field (<a href="../airport_code.htm">IATA code</a>: SAN) a busy airport that serves San Diego region, more than 18 million passengers used the airport in 2008 (<a href="http://www.san.org/sdia/at_the_airport/education/airport_statistics.aspx" target="_top">source</a>)</div>',
		   '<div class="infobox"><b>San Francisco Int\'l Airport</b> San Francisco\'s major international airport (<a href="../airport_code.htm">IATA Code</a>: SFO) located 13 miles (21 km) south of downtown. SFO had a passenger volume of 37.2 million in 2008 (source: <a href="http://www.airports.org/" target="_top">ACI</a>).</div>',
		   '<div class="infobox"><b>San José Int\'l Airport</b>Norman Y. Mineta San José Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: SJC), is the only commercial airport in Santa Clara County/Silicon Valley. SJC has served a total of 9.7 million passenger in 2008 (<a href="http://www.flysanjose.com/about.php?page=newsroom/fast_facts" target="_top">source</a>).</div>',
		   '<div class="infobox"><b>Saint Louis Int\'l Airport</b>Lambert-St. Louis Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: STL) is the primary airport for St. Louis and is the largest international airport in the state of Missouri. The airport handled more than 14.4 million passengers in 2008.</div>',
		   '<div class="infobox"><b>Tampa Int\'l Airport</b>Tampa Airport (<a href="../airport_code.htm">IATA code</a>: TPA) is major public airport that serves the Tampa Bay Area. More than 18.2 million people traveled in and out of TPA in 2008. (<a href="http://www.tampaairport.com/about/facts/index.asp" target="_top">source</a>)</div>',
		   '<div class="infobox"><b>Reagan National Airport</b>Ronald Reagan Washington National Airport (<a href="../airport_code.htm">IATA code</a>: DCA) is the nearest commercial airport to Washington, D.C., the airport operates mostly domestic flights. Reagan National Airport has had 18 million passenger in 2008. (<a href="http://www.mwaa.com/reagan/about_reagan_national/air_traffic_statistics_2" target="_top">source</a>)</div>',
		   '<div class="infobox"><b>Washington Dulles Int\'l Airport</b> (<a href="../airport_code.htm">IATA code</a>: IAD) serves the greater Washington, D.C. metropolitan area, located 25 miles (40 km) west of the central business district of Washington, D.C., in Dulles, Virginia. Dulles served 23.8 miilion passengers in 2008. (<a href="http://www.mwaa.com/dulles/about_dulles_international_2/air_traffic_statistics" target="_top">source</a>)</div>',
		   '<div class="infobox"><b>Anchorage Int\'l Airport</b>Ted Stevens Anchorage Int\'l Airport (<a href="../airport_code.htm">IATA code</a>: ANC) connects Anchorage with Seattle. It is one of the World\'s busiest airports by cargo traffic, ranked # 5 in 2008 by Airports Council Int\'l, the airport served almost 5.4 million passengers in 2008. (<a href="http://www.dot.state.ak.us/anc/business/airServiceDevelopment/statistics/index.shtml" target="_top">source</a>)</div>'
];

var US_airports = [
		['Hartsfield-Jackson Atlanta Int\'l Airport', 'ATL', 33.639975, -84.4440, 1, US_content[0]],
		['Austin-Bergstrom Int\'l Airport','AUS', 30.2026, -97.6681, 2, US_content[1]],
		['Baltimore Thurgood Marshall Int\'l Airport', 'BWI', 39.1752, -76.6683, 3, US_content[2]],
		['Boston Logan Int\'l Airport', 'BOS', 42.3644, -71.0052, 4, US_content[3]],
		['Charlotte Int\'l Airport', 'CLT', 35.2209, -80.9442, 5, US_content[4]],
		['Chicago Midway Airport', 'MDW', 41.7908, -87.7479, 6, US_content[5]],
		['Chicago O\' Hare Int\'l Airport', 'ORD', 41.97340, -87.901846, 7, US_content[6]],
		['Cincinnati/Northern Kentucky Int\'l Airport', 'CVG', 39.0552, -84.6612, 8, US_content[7]],
		['Cleveland Hopkins Int\'l Airport', 'CLE', 41.40451, -81.84366, 9, US_content[8]],
		['Port Columbus Int\'l Airport', 'CMH', 39.9980, -82.8840, 10, US_content[9]],
		['Dallas/Fort Worth Int\'l Airport', 'DFW', 32.896667, -97.037778, 11, US_content[10]],
		['Denver Int\'l Airport', 'DEN', 39.8495, -104.6738, 12, US_content[11]],
		['Detroit Metropolitan Wayne County Airport', 'DTW', 42.2078, -83.3562, 13, US_content[12]],
		['Hartford Int\'l Airport', 'BDL', 41.929232, -72.681909, 14, US_content[13]],
		['Honolulu Int\'l Airport', 'HNL', 21.3327, -157.9201, 15, US_content[14]],
		['Houston George Bush Intercontinental Airport', 'IAH', 29.9934, -95.3401, 17, US_content[15]],
		['William P. Hobby Airport', 'HOU', 29.6523, -95.2766, 16, US_content[16]],
		['Indianapolis Int\'l Airport', 'IND', 39.7313, -86.272, 18, US_content[17]],
		['Kansas City Int\'l Airport', 'MCI', 39.2976, -94.7139, 20, US_content[18]],
		['Charles B. Wheeler Downtown Airport', 'MKC', 39.1207, -94.5893, 19, US_content[19]],
		['McCarran Int\'l Airport Las Vegas', 'LAS', 36.0769, -115.1465, 21, US_content[20]],
		['Los Angeles Int\'l Airport', 'LAX', 33.9378, -118.3995, 33, US_content[21]],
		['Memphis Int\'l Airport', 'MEM', 35.0447, -89.9816, 23, US_content[22]],
		['Miami Int\'l Airport (Wilcox)', 'MIA', 25.7965, -80.2756, 24, US_content[23]],
		['Minneapolis-Saint Paul Int\'l Airport', 'MSP', 44.8819, -93.2216, 25, US_content[24]],
		['Nashville Int\'l Airport', 'BNA', 36.1314, -86.6694, 26, US_content[25]],
		['Louis Armstrong New Orleans Int\'l Airport','MSY', 29.9842, -90.255, 27, US_content[26]],
		['LaGuardia Airport on Long Island', 'LGA', 40.7761, -73.8717, 29, US_content[27]],
		['John F. Kennedy Int\'l Airport', 'JFK', 40.6424805, -73.788071, 30, US_content[28]],
		['Newark Liberty Int\'l Airport', 'EWR', 40.68987, -74.17821, 28, US_content[29]],
		['Metropolitan Oakland Int\'l Airport', 'OAK', 37.7124, -122.2198, 31, US_content[30]],
		['Ontario Int\'l Airport', 'ONT', 34.0597, -117.5976, 32, US_content[31]],
		['Orlando Int\'l Airport', 'MCO', 28.4313828, -81.3084, 22, US_content[32]],
		['Philadelphia Int\'l Airport', 'PHL', 39.8719, -75.2392, 34, US_content[33]],
		['Phoenix Sky Harbor Int\'l Airport', 'PHX', 33.4310, -112.0102, 35, US_content[34]],
		['Pittsburgh Int\'l Airport', 'PIT', 40.495999, -80.2566, 36, US_content[35]],
		['Portland Int\'l Airport', 'PDX', 45.5896, -122.5921, 37, US_content[36]],
		['Raleigh-Durham Int\'l Airport', 'RDU', 35.8773, -78.7891, 38, US_content[37]],
		['Sacramento Int\'l Airport', 'SMF', 38.6927, -121.5881, 39, US_content[38]],
		['Salt Lake City Int\'l Airport', 'SLC', 40.7855, -111.9806, 40, US_content[39]],
		['San Antonio Int\'l Airport', 'SAT', 29.5249, -98.4732, 41, US_content[40]],
		['San Diego Int\'l Airport (Lindbergh Field)', 'SAN', 32.7319, -117.1973, 42, US_content[41]],
		['San Francisco Int\'l Airport', 'SFO', 37.6152, -122.3899, 43, US_content[42]],
		['Norman Y. Mineta San José Int\'l Airport', 'SJC', 37.3666, -121.9259, 44, US_content[43]],
		['Lambert-St. Louis Int\'l Airport', 'STL', 38.7421, -90.3657, 45, US_content[44]],
		['Tampa Int\'l Airport', 'TPA', 27.9768, -82.5333, 46, US_content[45]],
		['Ronald Reagan Washington National Airport', 'DCA', 38.8493, -77.0414, 47, US_content[45]],
		['Washington Dulles Int\'l Airport', 'IAD', 38.944444,-77.455833, 47, US_content[46]],
		['Ted Stevens Anchorage Int\'l Airport', 'ANC', 61.1739, -149.9810, 48, US_content[47]]

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
      // This marker is 40 pixels wide by 32 pixels tall.
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
      coord: [1, 1, 1, 30, 25, 30, 25 , 1],
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
