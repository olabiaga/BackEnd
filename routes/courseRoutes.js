
const express = require('express');
const router = express.Router();
const {getAllcourses, getCourseById, createCourse, updateCourse, deleteCourse} = require('../controllers/courseController');

router.get('/', getAllcourses);
router.get('/:id', getCourseById);
router.post('/', createCourse); 
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
