var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
  res.render('index', { title: 'Express' });
});

module.exports = router;
