const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, './public')))

app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, './public'))
})

app.listen(1337, () => {
  console.log('Listening on 1337...')
})
