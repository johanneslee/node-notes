const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();
const router = express.Router();

router.get('/entries/:english', async (req, res, next) => {
  const english = req.params.english.toLowerCase();
  const url = `${process.env.OXFORD_DOMAIN}/api/v2/entries/en/${english}`;
  const config = {
    headers: {
      app_id: process.env.OXFORD_ID,
      app_key: process.env.OXFORD_KEY,
      language: 'en-gb',
      word_id: english
    }
  };

  const response = await axios.get(url, config)
    .then(res => res.data.results
      .filter(entry => entry.id === english)
      .map(entry => entry.lexicalEntries[0].entries[0].senses[0].definitions[0])[0]
    )
    .catch(err => console.error(err));
  res.json({
    description: (typeof(response) === 'undefined') ? 'No Results' : response
  });
});

module.exports = router;