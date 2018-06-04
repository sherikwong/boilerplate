const db = require('./db');
const app = require('./app');
const port = process.env.PORT || 1337;

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log('Listening on 1337...')
    })
  })
