const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');

dotenv.config();
const router = express.Router();

router.get('/entries/:english', async (req, res, next) => {
    const english = encodeURIComponent(req.params.english);

    const domain = process.env.OXFORD_DOMAIN;
    const config = {
        headers: {
            app_id: process.env.OXFORD_ID,
            app_key: process.env.OXFORD_KEY,
            language: 'en-gb',
            word_id: english
        }
    };

    const url = `${domain}/api/v2/entries/en/${english}`;
    console.log(url);

    axios
        .get(url, {}, {
            headers: {
                app_id: process.env.OXFORD_ID,
                app_key: process.env.OXFORD_KEY,
                language: 'en-gb',
                word_id: english
            }
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));
});

module.exports = router;