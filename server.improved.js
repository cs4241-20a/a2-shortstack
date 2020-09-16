const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      bodyParser = require('body-parser'),
      dir  = 'public/',
      port = 3000


const express = require('express')
var app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var appdata = [
  {
    "Name" : "go grocery shopping",
    "Priority": "medium",
    "Deadline": "Thursday"
  },
  {
    "Name": "finish math homework",
    "Priority": "high",
    "Deadline": "Wednesday"
  }]

  app.get('/', function(req, res) {
    res.sendFile('public/index.html', {root: '.'})
  })
  app.get('/scripts.js', function(req, res) {
    res.sendFile('public/js/scripts.js', {root: '.'})
  })
  app.get('/style.css', function(req, res) {
    res.sendFile('public/css/style.css', {root: '.'})
  })


app.post('/submit', function (req, res) {
  console.log(req)
  console.log(req.body)
  let dataString = ''

  res.on( 'data', function( data ) {
      console.log(data)
      dataString += data
  })

  console.log(dataString)

  res.on( 'end',  function() {
    console.log("test")
    var jsonData = JSON.parse( dataString )

    console.log("test again")
    let action = jsonData.action
    console.log("test again2")
    if(action.includes('add')) {
      let name = jsonData.taskname
      let prior = jsonData.taskpriority
      let deadline = jsonData.taskdeadline
      let entries = {}
      entries["Name"] = name
      entries["Priority"] = prior
      entries["Deadline"] = deadline
      console.log(entries)
      appdata.insert(entries)
    }

    console.log("test3")
    if(action.includes('edit')) {
      let name = jsonData.taskname
      let prior = jsonData.taskpriority
      let deadline = jsonData.taskdeadline
      let newEntries = {}
      entries["Name"] = name
      entries["Priority"] = prior
      entries["Deadline"] = deadline
      console.log(newEntries)
      appdata(entries).insert(newEntries)
    }

    console.log("test3")
    if(action.includes('delete')) {
      let name = jsonData.taskname
      let prior = jsonData.taskpriority
      let deadline = jsonData.taskdeadline
      let entries = {}
      entries["Name"] = name
      entries["Priority"] = prior
      entries["Deadline"] = deadline
      console.log(entries)
      appdata(entries).remove();
    }

    console.log("test4")
    var sendingJSON = {}
    for(let newEntry in appdata) {
      sendingJSON.push(newEntry)
    }

    console.log(sendingJSON)

    res.status(200)
    res.json(JSON.stringify({}))

})

})

const sendFile = function( response, filename ) {
   const type = mime.getType( filename )

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       res.writeHeader( 200, { 'Content-Type': type })
       res.end( content )

     }else{

       // file not found, error code 404
       res.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

app.listen( port, () => {
  console.log("starting server")
})
