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

class Flight(db.Model):
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
    self.response.out.write('<!DOCTYPE HTML>')
    self.response.out.write('<html><body>')
    self.response.out.write('<head>')
    self.response.out.write("""
          <title>SkyPin: Pin your destination, find your flight fast</title>"""
    self.response.out.write('</head>')
    greetings = db.GqlQuery("SELECT * "
                            "FROM Flight "
                            "ORDER BY price DESC LIMIT 20")

    for greeting in greetings:
      if greeting.author:
        self.response.out.write('<b>%s</b> wrote:' % greeting.author.nickname())
      else:
        self.response.out.write('An anonymous person wrote:')
      self.response.out.write('<blockquote>%s</blockquote>' %
                              cgi.escape(greeting.content))


    self.response.out.write("""
          <form>
            <p><label>Departure date:</label></p>
              <fieldset>
                <legend></legend>
              </fieldset>
 action="/sign" method="post">
            <div><textarea name="content" rows="3" cols="60"></textarea></div>
            <div><input type="submit" value="Sign Guestbook"></div>
          </form>
        </body>
      </html>""")


class Flights(webapp.RequestHandler):
  def __init__(self):

  def addFlight(self):
    flight = Flight()

    if users.get_current_user():
      greeting.author = users.get_current_user()

    greeting.content = self.request.get('content')
    greeting.put()
    self.redirect('/')


application = webapp.WSGIApplication([
  ('/', MainPage),
], debug=True)


def main():
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
