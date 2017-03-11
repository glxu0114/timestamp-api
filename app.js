var express = require('express');
var path = require('path');
var moment = require('moment');
var http = require('http');
var app = express();
var re = new RegExp("^[0-9]*$");

app.set( 'port', process.env.PORT || 8080 );

app.get('/', function (req, res) {
  
  res.sendFile(path.join(__dirname +'/index.html'));
  
})

app.get('/:data', function(req, res){
  
    var date = req.params.data;
    var stamp = {"unix": null, "natrual": null};
    
    if(re.test(date))
    {
       //console.log("unix");
       if(moment(date, "X").isValid())
      {
          stamp = {"unix": moment(date, "X").unix(),
                   "natrual": moment(date, "X").format('MMMM DD, YYYY')
                  }
      }
    }
    
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

http.createServer( app ).listen( app.get( 'port' ), function (){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
});