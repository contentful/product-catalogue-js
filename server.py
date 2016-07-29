import SimpleHTTPServer, SocketServer
import os

PORT = 8000

class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
  def do_GET(self):
    """Return the requested file if it exists otherwise return index.html"""
    if os.access('.' + os.sep + self.path, os.R_OK):
      SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self);
    else:
      self.send_response(200)
      self.send_header('Content-Type', 'text/html')
      self.end_headers()
      self.wfile.write(open('index.html').read())

httpd = SocketServer.TCPServer(('', PORT), MyHandler)
httpd.serve_forever()
