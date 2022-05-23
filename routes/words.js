var express = require('express');
var mysql = require('../lib/mysql');

var router = express.Router();

router.post('', async (req, res, next) => {
  const korean = req.get('korean');
  const english = req.get('english');
  const description = req.get('description');

  const results = mysql.query(`INSERT INTO WORDS (KOREAN, ENGLISH, DESCRIPTION) VALUES ('${korean}','${english}','${description}')`);

  res.send(results);
});

router.get('/:seq', async (req, res, next) => {
  const word_seq = req.params.seq;

  const results = mysql.query(`SELECT * FROM WORDS WHERE SEQ = ${word_seq}`);

  res.send(results);
});

module.exports = router;