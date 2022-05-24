const express = require('express');
const mysql = require('../lib/mysql');

const router = express.Router();
const pool = mysql.getPool();

router.post('', async (req, res, next) => {
  const korean = decodeURIComponent(req.get('korean'));
  const english = req.get('english');
  const description = req.get('description');
  const sql = `INSERT INTO WORDS (KOREAN, ENGLISH, DESCRIPTION) VALUES ('${korean}','${english}','${description}')`;
  pool.getConnection((error, connection) => {
    if(error) {
      console.log(err);
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
      res.status(500).send('Internal Server Error');
    }
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if(error) {
        console.log(err);
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
        res.status(500).send('Internal Server Error');
      }
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
      res.send(results);
    });
  });
});

router.get('/:seq', async (req, res, next) => {
  const word_seq = req.params.seq;
  const sql = `SELECT * FROM WORDS WHERE SEQ = ${word_seq}`;
  pool.getConnection((error, connection) => {
    if(error) {
      console.log(err);
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
      res.status(500).send('Internal Server Error');
    }
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if(error) {
        console.log(err);
        res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
        res.status(500).send('Internal Server Error');
      }
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate'); // For vercel environment
      res.send(results);
    });
  });
});

module.exports = router;