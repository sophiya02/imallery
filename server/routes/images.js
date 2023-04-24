const express = require('express');
const {getAllImage, getImage, createImage, updateImage, deleteImage}= require('../controllers/images')
const upload = require('../multer/multer')
const router = express.Router();


router.route('/').get(getAllImage).post(upload.single('image') , createImage);
router.route('/:id').get(getImage).patch(updateImage).delete(deleteImage);

module.exports = router;
