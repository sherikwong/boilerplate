const router = require('express').Router();

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
      else {
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.use(function (req, res, next) {
  const error = new Error('Not found.');
  error.status = 404;
  next(error);
})


module.exports = router;
