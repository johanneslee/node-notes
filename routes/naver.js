const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();
const router = express.Router();

router.get('/papago/:korean', async (req, res, next) => {
  const korean = encodeURIComponent(req.params.korean.toLowerCase());
  const url = `${process.env.NAVER_PAPAGO_DOMAIN}/v1/papago/n2mt`;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': process.env.NAVER_ID,
      'X-Naver-Client-Secret': process.env.NAVER_SECRET
    },
    params: {
      'source': 'ko',
      'target': 'en',
      'text': korean
    }
  };

  const response = await axios.post(url, config)
    .then(res => res)
    .catch(err => console.error(err));
  res.json((typeof(response) === 'undefined') ? 'No Results' : response);
});

module.exports = router;