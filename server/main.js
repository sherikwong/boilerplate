const db = require("./db");
const app = require("./app");
const port = process.env.PORT || 1337;
const session = require("express-session");

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

db.sync().then(() => {
  app.listen(port, () => {
    console.log("Listening on 1337...");
  });
}

// sync so that our session table gets created
dbStore.sync();

// plug the store into our session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});
