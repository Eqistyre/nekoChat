var express = require('express');
var orm = require('orm');
var router = express.Router();

/* GET home page of login and register. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'nekoChat' });
});

router.post('/register', function(req, res, next) {

});

router.post('/login', function(req, res, next) {

});

module.exports = router;
