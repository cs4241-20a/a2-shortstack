const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const appdata = [
  { 'model': 'toyota', 'year': 1999, 'mpg': 23 },
  { 'model': 'honda', 'year': 2004, 'mpg': 30 },
  { 'model': 'ford', 'year': 1987, 'mpg': 14} 
]

const cards = [ 
  { 'question': 'first?', 'answer': 'first answer', 'priority': 15},
  { 'question': '2nd?', 'answer': 'first answer', 'priority': 12},
  { 'question': 'second?', 'answer': 'second answer', 'priority': 0}
]

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else{
    sendFile( response, filename )
  }
}


const handlePost = function( request, response ) {
  console.log(request.url)
  if(request.url === '/clear'){
    console.log("clear") 
    cards.splice(0, cards.length)
    let output = JSON.stringify(cards)
    response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
    response.end(output)
  } 
  else{
    let dataString = ' '
    request.on( 'data', function( data ) {
      dataString = JSON.parse(data)
    })

    request.on( 'end', function() {
      console.log( dataString )
      let priority = getPriority(dataString)
      let newCard = '{ "question": "'+ dataString.question+ '", "answer": "'+ dataString.answer+'", "priority": "'+ priority+ '" }'
      newCard = JSON.parse(newCard)
      insertCard(newCard, priority)
      //console.log(cards)
      let output = JSON.stringify(cards)

      response.writeHead( 200, "OK", {'Content-Type': 'application/json' })
      console.log("end")
      response.end(output)
    })
  }
}

function insertCard(newCard, priority){
  let i =0
  if(cards.length === 0){
    cards.splice(0,0,newCard)
  }
  while(i<cards.length){
    if(cards[i].priority <=priority){
      cards.splice(i,0,newCard)
      break
    }
    i++
  }

}

function getPriority(dataString){
    let diff = dataString.difficulty
    let imp = dataString.importance
    
    switch (diff){
      case('e'):
        diff = 0
        break
      case('m'):
        diff = 2
        break
      case('h'):
        diff = 4
        break
    }
  
  let priority = (imp*5 )+ diff
  console.log("imp:"+ imp +", diff:"+ diff +", prio:"+ priority)
  return priority
  
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
