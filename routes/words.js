const express = require('express');
const mysql = require('../lib/mysql');

const router = express.Router();
const pool = mysql.getPool();

router.post('', (req, res, next) => {
  const jsonObj = req.body;
  const korean = decodeURIComponent(jsonObj.korean);
  const english = jsonObj.english;
  const description = jsonObj.description;
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

router.get('', (req, res, next) => {
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
      results.forEach(function(result, index) {
        let lowerCased = {};
        for (let key in result) {
          lowerCased[key.toLowerCase()] = result[key];
        }
        this[index] = lowerCased;
      }, results);
      res.send(results);
    });
  });
});

router.get('/:seq', (req, res, next) => {
  const word_seq = req.params.seq;
  const sql = `SELECT * FROM WORDS WHERE SEQ = ${word_seq}`;
  pool.getConnection((error, connection) => {
    if (error) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    connection.query(sql, (error, results, fields) => {
      connection.release();
      if (error) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      results.forEach(function(result, index) {
        let lowerCased = {};
        for (let key in result) {
          lowerCased[key.toLowerCase()] = result[key];
        }
        this[index] = lowerCased;
      }, results);
      res.send(results);
    });
  });
});

module.exports = router;