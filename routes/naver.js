const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();
const router = express.Router();

router.get('/papago/:korean', async (req, res, next) => {
  const korean = req.params.korean;
  const url = `${process.env.NAVER_PAPAGO_DOMAIN}/v1/papago/n2mt`;
  const params = new URLSearchParams();
  params.append('source', 'ko');
  params.append('target', 'en');
  //params.append('dict', true);
  params.append('text', korean);
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': process.env.NAVER_ID,
      'X-Naver-Client-Secret': process.env.NAVER_SECRET
    }
  };

  const response = await axios.post(url, params, config)
    .then(res => res.data.message.result)
    .catch(err => console.error(err));

  const english = response.translatedText;
  /*
  const dict = response.dict;
  if(dict !== '' && typeof(dict) !== 'undefined'){
    // Not use
    const items = dict.items;
    console.log(items);
    items.forEach(item => {
      const entry = item.entry.replace('<b>','').replace('</b>','');
      console.log(entry);
      const meanings = item.pos[0].meanings;
      meanings.forEach(meaning => {
        console.log(meaning.meaning.replace('<b>','').replace('</b>',''));
      });
    });
  }
  */

  res.json({
    english: (typeof(english) === 'undefined') ? '' : english
  });
});

module.exports = router;