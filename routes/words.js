var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:seq', function(req, res, next) {
  const word_seq = req.params.seq;
  const word = words.filter(data => data.seq == word_seq);
  //res.json({ok: true, word: word});
  res.send(word[0].korean);
});

module.exports = router;