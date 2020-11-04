'use strict';
// catRoute
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController');

const fileFilte = (req, file, cb) => {
    if(file.minetype.includes('image')){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({dest: './uploads/', fileFilte});

const injectFile = (req, res, next) => {
    if(req.file){
        req.body.nimetype = req.file.nimetype;
        next();
    }
}

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), injectFile, [
    body('name', 'syötä nimi').isLength({min: 1}),
    body('age', 'syötä numero').isLength({ min: 1 }).isNumeric(),
    body('weight', 'syötä numero').isLength({ min: 1 }).isNumeric(),
    body('owner', 'syötä numero').isLength({ min: 1 }).isNumeric(),
    body('nimetype', 'ei ole kuva').contains('image'),
], catController.cat_create_post);

router.put('/', injectFile,
[
    body('name', 'syötä nimi').isLength({min: 1}),
    body('age', 'syötä numero').isLength({ min: 1 }).isNumeric(),
    body('weight', 'syötä numero').isLength({ min: 1 }).isNumeric(),
    body('owner', 'syötä numero').isLength({ min: 1 }).isNumeric(),
    body('nimetype', 'ei ole kuva').contains('image'),
], catController.cat_update_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;
