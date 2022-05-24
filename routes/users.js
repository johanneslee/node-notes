var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
  res.send('respond with a resource');
});

module.exports = router;
