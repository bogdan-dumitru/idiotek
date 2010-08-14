require("../lib/proto");
var sys = require('sys'),
    http = require('http'),
    fs = require('fs'),
    path = require('path'),
    idiotek;

function Idiotek( opts ) {
  this.options = {
    name: "default",
    address: "127.0.0.1",
    port: "1337",
    www_dir: "./public"
  }.mixin( opts || {} );
  this.server = new http.Server();
}

Idiotek.prototype.mixin({
  start: function() {
    var self = this;
    this.server.addListener( "request", function( request, response) {
      sys.puts( request.url );
      path.exists( req_path = path.join( self.options.www_dir, request.url), function ( exists ) {
        if ( exists ) {  
          fs.stat( req_path, function( err, stats ) {
            if ( stats.isDirectory() ) {
              response.writeHead( 200, { "Content-Type": "text/plain"} );
              aresponse.end("DIR2");
            } else {
              response.writeHead( 200, { "Content-Type": "text/plain"} );
              response.end("FILE");
            }
          });
        } else {
          response.writeHead( 404, { "Content-Type": "text/plain"} );
          response.end();
        }
      });
    }).listen( self.options.port, self.options.address );
  }
});


idiotek = new Idiotek();
idiotek.start();

