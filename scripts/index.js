  const http = require('http');
  const fs = require('fs');
  var formidable = require('formidable');

  const hostname = '127.0.0.1';
  const port = 3000;

  //var myGame = require('./Game.js');
  //eval(fs.readFileSync('Game.js')+'');

  fs.readFile('../Blank.html',(err,html) => {if(err){throw err;}

    const server = http.createServer((req,res)=>{
      res.StatusCode = 200;
      res.setHeader('Content-type', 'text/html');
      res.write(html);
      res.end();
    });

    server.listen(port, hostname, () => {
      console.log('Server Started at Port' + port );
    });

  });

  //fs.readFile(__dirname +'/Game.js',(err,js) => {if(err){throw err;}} );
