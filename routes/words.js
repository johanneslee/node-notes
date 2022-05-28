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
      res.status(500).send('Internal Server Error');
    }
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if(error) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.send(results);
    });
  });
});

router.get('', async (req, res, next) => {
  const sql = `SELECT * FROM WORDS`;
  pool.getConnection((error, connection) => {
    if(error) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if(error) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
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
      res.status(500).send('Internal Server Error');
    }
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if(error) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.send(results);
    });
  });
});

module.exports = router;