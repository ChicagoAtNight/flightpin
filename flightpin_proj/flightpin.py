#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import cgi
import datetime
import wsgiref.handlers

from google.appengine.ext import db
from google.appengine.ext import webapp

#class Flight(db.Model):
#  def __init__(self):
  # airline =
  # arrives =
  # stop_1 =
  # stop_2 =
  # stop_3 =
  # departs =
  # price =
  # airport_a =
  # airport_b =
  # airport_c =
  # airport_d =
  # duration =
  # author = db.UserProperty()
  # content = db.StringProperty(multiline=True)
  # date = db.DateTimeProperty(auto_now_add=True)


class MainPage(webapp.RequestHandler):
  def get(self):
    self.response.out.write('''
<!DOCTYPE html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />''')
    self.response.out.write('<html xmlns="http://www.w3.org/1999/xhtml">\n')
    self.response.out.write('<head>')
    self.response.out.write('<title>FlightPin: Pin your destination, find your flight fast</title>\n')
    self.response.out.write('<link rel="shortcut icon" href="www/images/favicon.ico">\n')
    self.response.out.write('<script type="text/javascript" src="www/scripts/jquery-1.3.2.min.js"></script>\n')
    self.response.out.write('<script type="text/javascript" src="www/scripts/cal.js"></script>\n')
    self.response.out.write('<script type="text/javascript" src="www/scripts/main.js"></script>\n')
    self.response.out.write('''<script type="text/javascript">
            jQuery(document).ready(function ()
            {
	      $('input.one').simpleDatepicker();
            });\n''')
    self.response.out.write('</script>\n')

    self.response.out.write('''<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true">
</script>\n''')
    self.response.out.write('''
<script type="text/javascript">
  var map;
  var kmlLayer = null;
  function initialize() {
    var lincoln_NB = new google.maps.LatLng(40.818007, -96.767641);
    var myOptions = {
      zoom: 4,
      center: lincoln_NB,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
      map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
      kmlLayer = new google.maps.KmlLayer(http://cw.sampas.net/kml/ALL_US_airports_20090827-20091022.kml, { map: map });
      currentLayer = kmlLayer;
  }

  function clearLayer() {
    if (currentLayer != null) {
      currentLayer.setMap(null);
    }
  }

</script>
\n''')
    self.response.out.write('<link href="www/stylesheets/calendar.css" rel="stylesheet" type="text/css" />\n')
    self.response.out.write('<link href="www/stylesheets/main.css" rel="stylesheet" type="text/css" />\n')
    self.response.out.write('<link href="http://fonts.googleapis.com/css?family=Droid+Sans" rel="stylesheet" type="text/css">\n')
    self.response.out.write('</head><body onload="initialize()">\n')

    #greetings = db.GqlQuery("SELECT * "
     #                       "FROM Flight "
      #                      "ORDER BY price DESC LIMIT 20")

#    for greeting in greetings:
#      if greeting.author:
#        self.response.out.write('<b>%s</b> wrote:' % greeting.author.nickname())
#      else:
#        self.response.out.write('An anonymous person wrote:')
#      self.response.out.write('<blockquote>%s</blockquote>' %
#                              cgi.escape(greeting.content))


    self.response.out.write('<div id="mycontainer">\n')
    self.response.out.write('  <div id="lhs" class="halves" style="float:left;">\n')
    self.response.out.write('   <div id="map_canvas">\n')
    self.response.out.write('   </div><!-- map_canvas -->\n')
    self.response.out.write('  </div><!-- lhs -->\n')
    self.response.out.write('  <div id="rhs" class="halves" style="float: right;">\n')
    self.response.out.write('''
          <div id="departdatediv" class="datelabel">Departure date: <br>
            <form>
              <input id="seldate1" class="one" type="text" name="date" value="Select" />
              <input id="onewaycheck" type="checkbox" name="arrangement" selected="" onClick=toggleElementOnCheck('returndatediv',this,'returndate') value="oneway" />
              <span id="chb1" class="onewaylabel">(one way flight)
              </span><!-- chb1 -->
            </form>
          </div> <!-- departdatediv -->
          <div id="returndatediv" class="datelabel">Return date (or choose one-way):
              <br><form>
                <input id="returndate" class="one" type="text" name="date" value="Select" />
              </form>
          </div><!-- returndatediv -->
          <div id="logo">
            <img src="www/images/logo.png" alt="FlightPin Logo">
          </div><!-- logo -->
\n''')
    self.response.out.write('</div><!-- rhs -->\n')
    self.response.out.write('''
          <div id="footer">
            <div id="pins">
              <img src="www/images/pin_trailers.png" alt="flight pins">
            </div><!-- logo -->
          </div><!-- footer -->\n''')
    self.response.out.write('</div><!-- mycontainer -->\n')
    self.response.out.write('</body></html>')


#class Flights(webapp.RequestHandler):
#  def __init__(self):

#  def addFlight(self):
#    flight = Flight()

#    if users.get_current_user():
#      greeting.author = users.get_current_user()

#    greeting.content = self.request.get('content')
#    greeting.put()
#    self.redirect('/')


application = webapp.WSGIApplication([
  ('/', MainPage),
], debug=True)


def main():
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
