var express = require('express');
var path = require('path');
var https = require( 'https' );
var moment = require('moment');
var app = express();
var re = new RegExp("^[0-9]*$");

app.set( 'port', process.env.PORT || 3001 );

app.get('/', function (req, res) {
  
  res.sendFile(path.join(__dirname +'/index.html'));
  
})

app.get('/:data', function(req, res){
  
    var date = req.params.data;
    var stamp = {"unix": null, "natrual": null};
    
    //Unix to Natural Form
    if(re.test(date))
    {
     
      if(moment(date, "X").isValid())
      {
          stamp = {"unix": moment(date, "X").unix(),
                   "natrual": moment(date, "X").format('MMMM DD, YYYY')
                  }
      }
    }
    
    //Natural form to Unix
    else
    {
      if(moment(date, "MMM DD, YYYY").isValid())
      {
          stamp = {"unix": moment(date, "MMM DD, YYYY").unix(),
                   "natrual": moment(date, "MMM DD, YYYY").format('MMMM DD, YYYY')
                  }
      }
    }
    
    res.send(JSON.stringify(stamp));
    
})

https.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});