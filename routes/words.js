var express = require('express');
var mysql = require('../lib/mysql');

var router = express.Router();

router.post('words', async (req, res, next) => {
  const korean = req.params.korean;
  const english = req.params.english;
  const description = req.params.description;
  const results = mysql.query(`INSERT INTO WORDS (KOREAN, ENGLISH, DESCRIPTION) VALUES ('${korean}','${english}','${description}'`);
  console.log(results);
  res.send(results);
});

router.get('words/:seq', async (req, res, next) => {
  const word_seq = req.params.seq;
  const results = mysql.query(`SELECT * FROM WORDS WHERE SEQ = ${word_seq}`);
  console.log(results);
  res.send(results);
});

module.exports = router;