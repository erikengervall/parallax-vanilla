const express = require('express')
const app = express()
const path = require('path')

app.use('/dist', express.static(__dirname + '/dist'))
app.use('/test', express.static(__dirname + '/test'))

app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`)
})
