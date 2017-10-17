const express = require('express')
const app = express()
const path = require('path')

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/test', express.static(__dirname + '/test'))

app.set('view engine', 'html')

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.listen(3000, function() {
  console.log('Local dev server on port 3000')
})
