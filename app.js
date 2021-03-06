var express = require('express'),
    stylus  = require('stylus'),
    nib     = require('nib'),
    os      = require("os");

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', {
    layout : false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({
    src: __dirname + '/public',
    compile: function( str, path ) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
    }
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get("/", function( req, res ) {
  res.render("index.ejs");
});

if ( os.hostname() !== "node") {
  app.listen(4000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
