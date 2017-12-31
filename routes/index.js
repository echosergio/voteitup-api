var express = require('express');
var router = express.Router();

var authRoutes = require('./auth');
var pollsRoutes = require('./polls');
var usersRoutes = require('./users');

router.get('/status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/auth', authRoutes);
router.use('/polls', pollsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
