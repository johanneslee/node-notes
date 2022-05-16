var express = require('express');
var router = express.Router();

const words = [
  {
    seq: 1,
    korean: '가위',
    english: 'Scissors',
    description: '(used with a singular or plural verb) a cutting instrument for paper, cloth, etc., consisting of two blades, each having a ring-shaped handle, that are so pivoted together that their sharp edges work one against the other (often used with pair of).'
  },
  {
    seq: 2,
    korean: '나비',
    english: 'Butterfly',
    description: 'any of numerous diurnal insects of the order Lepidoptera, characterized by clubbed antennae, a slender body, and large, broad, often conspicuously marked wings.'
  },
  {
    seq: 3,
    korean: '다람쥐',
    english: 'Squirrel',
    description: 'any of numerous arboreal, bushy-tailed rodents of the genus Sciurus, of the family Sciuridae.'
  }
];

/* GET home page. */
router.get('/:seq', function(req, res, next) {
  const word_seq = req.params.seq;
  const word = words.filter(data => data.seq == word_seq);
  //res.json({ok: true, word: word});
  res.send(word[0].korean);
});

module.exports = router;