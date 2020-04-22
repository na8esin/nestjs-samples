// HttpModuleのテストのためのスタブ

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send(JSON.stringify(
    [{ id: 1, firstName: 'Takayuki', lastName: 'Watanabe' },
    { id: 2, firstName: 'huga', lastName: 'hoge' }],
  ))
})

app.listen(3001)