const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000;

const randomwords = ['size','pipe','show','toy','zipper','throne','baby','seat','river','ocean','spade',
'pump','cakes','skate','cat','vegetable','nut','furniture','tendency','car','sleet','truck','basket','writer',
'fish','rock','ants','border','experience','kitty','flesh','servant','hydrant','planes','week','office',
'dog','art','yak','distance','stocking','snails','playground','knot','curtain','wrench','daughter','seashore',
'side','channel','cow','surprise','team','partner','paper','leg','arch','produce','bell','language','hope',
'women','angle','cream','jar','respect','pigs','loaf','fly','time','uncle','move','earth','pies','flame',
'door','place','wing','fact','cherries','need','knee','ground','key','farm','direction','crayon','authority',
'idea','cake','winter','copper','son','cactus','caption','road','slope','trouble','finger','comparison'];

let scores = [],
    currentWord = '';

const server = http.createServer(function( request,response ) {
  if (request.method === 'GET') {
    handleGet(request, response);
  } else if (request.method === 'POST'){
    handlePost(request, response);
  }
})

const handleGet = function(request, response) {
  const filename = dir + request.url.slice(1);

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === '/currentWord'){

    currentWord = randomwords[Math.floor(Math.random() * randomwords.length)];

    response.writeHead(200, {'Content-Type': 'text/plain' });
    response.end(currentWord); 

  } else {
    sendFile(response, filename);
  }
}

const handlePost = function( request, response ) {
  let dataString = '';

  request.on( 'data', function( data ) {
      dataString += data;
  })

  if (request.url === '/guess'){
    request.on( 'end', function() {
      let guess = JSON.parse(dataString).guess;

      response.writeHead( 200, "OK", {'Content-Type': 'text/plain' });
      response.end((guess === currentWord).toString()); // sends the boolean in string format
    })
  } else {
    response.writeHead(200);
    response.end();
  }
}

const sendFile = function(response, filename) {
   const type = mime.getType(filename);

   fs.readFile(filename, function(err, content) {

     // if the error = null, then we've loaded the file successfully
     if (err === null) {

       // status code: https://httpstatuses.com
       response.writeHeader(200, {'Content-Type': type});
       response.end(content);

     } else {

       // file not found, error code 404
       response.writeHeader(404)
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen(process.env.PORT || port, () => console.log('Listening on Port:', port));
