'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const catController = require('../controllers/catController');

const upload = multer({ dest: './uploads/' })

router.get('/', catController.cat_list_get);
router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), function (req, res) {
    console.log(req.body, req.file);
    res.send('With this endpoint you can add cats.')
  });
/*
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(catModel.cats[req.params.id]);
});*/

router.post('/', (req, res) => {
  res.send('With this endpoint you can add cats.');
});

router.put('/', (req, res) => {
  res.send('With this endpoint you can edit cats');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete cats.');
});

module.exports = router;