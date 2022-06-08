const dotenv = require('dotenv');
const express = require('express');

dotenv.config();
const router = express.Router();

router.get('', async (req, res, next) => {
    res.send('papago');
});

module.exports = router;