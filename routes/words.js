var express = require('express');
var mysql = require('../lib/mysql');

var router = express.Router();

router.get('/:seq', async (req, res, next) => {
  const word_seq = req.params.seq;
  const results = mysql.query(`SELECT * FROM WORDS WHERE SEQ = ${word_seq}`);
  console.log(results);
  res.send(results);
});

module.exports = router;