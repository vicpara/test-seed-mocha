const express = require('express')
const app = express()

app.get('/', function(req, res) {
    res.send('Hello World!')
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})

app.get('/index', function(req, res) {
    res.send('Hello INDEX World!')
})