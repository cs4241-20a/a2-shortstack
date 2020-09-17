const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000

const MSG_ERR_NAME_BLANK = "Error: the Name field must not be empty."
const MSG_ERR_FIELD_MISMATCH = "Error: invalid input.  Score & Value fields must either be both empty or both filled."
const MSG_ERR_NON_NUMERIC = "Error: the Score and Value fields must only contain numbers."
const MSG_ERR_NO_ASSIGNMENT = "Error: no assignment with this name exists.  To create one, fill in the Score and Value fields."
const MSG_SUC_ASSIGN_ADD = "Successfully added a new assignment."
const MSG_SUC_ASSIGN_EDIT = "Successfully edited assignment."
const MSG_SUC_ASSIGN_REMOVE = "Successfully removed assignment."
const ACTION_NONE = "none"
const ACTION_EDIT = "edit"
const ACTION_NEW = "new"
const ACTION_DELETE = "delete"

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
  }else{
    sendFile( response, filename )
  }
}

let grades = []
function getTotalPercent() {
  let pointsAchieved = 0
  let pointsPossible = 0
  
  for(let i = 0; i<grades.length; i++) {
    pointsAchieved += grades[i].assignScore
    pointsPossible += grades[i].assignPossible
  }
  
  return Math.round(pointsAchieved / pointsPossible * 10000 ) / 100
}

function getAssignPercent(score, possible) {
  return Math.round( score / possible * 10000 ) / 100
}


function handleInput(reply, input) {
  
  const assignName = input.inputName
  if(assignName === "") {
    reply.message = MSG_ERR_NAME_BLANK
    reply.action = ACTION_NONE
    return
  }
  if( (input.inputScore === "") !== (input.inputPossible === "") ) {
    // ensure score & possible are either both full or both blank
    reply.message = MSG_ERR_FIELD_MISMATCH
    reply.action = ACTION_NONE
    return
  }
  const assignScore = Number(input.inputScore)
  const assignPossible = Number(input.inputPossible)
  if( Number.isNaN(assignScore) || Number.isNaN(assignPossible) ) {
    // ensure numeric fields are actually numeric
    reply.message = MSG_ERR_NON_NUMERIC
    reply.action = ACTION_NONE
    return
  }
  
  for (let i = 0; i<grades.length; i++) {
    if( grades[i].assignName === assignName ) {
      if( input.inputScore === "") {
        // delete item
        grades.splice(i)
        reply.message = MSG_SUC_ASSIGN_REMOVE
        reply.action = ACTION_DELETE
        return
        
      } else {
        // edit item  
        grades[i].assignScore = assignScore
        grades[i].assignPossible = assignPossible
        grades[i].percent = getAssignPercent( assignScore, assignPossible )
        reply.message = MSG_SUC_ASSIGN_EDIT
        reply.action = ACTION_EDIT
        return
      }
    }
  }
  // if no match, create new assign
  if( input.inputScore === "") {
    // but first check that fields are filled in
    reply.message = MSG_ERR_NO_ASSIGNMENT
    reply.action = ACTION_NONE
    return
  }
  
  let assignment = { assignName: assignName, assignScore: assignScore, assignPossible: assignPossible }
  assignment.percent = getAssignPercent( assignScore, assignPossible )
  grades.push( assignment )
  
  reply.message = MSG_SUC_ASSIGN_ADD
  reply.action = ACTION_NEW
  return
}

const handlePost = function( request, response ) {
  let jsonResponse = {}

  request.on( 'data', function( data ) {
    const inputJson = JSON.parse( data )
    handleInput( jsonResponse, inputJson )
    
    jsonResponse.grades = grades
    jsonResponse.total = getTotalPercent()
    
    
  })

  request.on( 'end', function() {

    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end( JSON.stringify(jsonResponse) )
  })
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
