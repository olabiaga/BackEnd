const pool = require('../config/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllcourses = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM courses');
        res.json(rows);
    }catch (err) {
        res.status(500).json({ error : err.message });
    }
}

const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM departments WHERE course_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Course not found '});
        }
        res.json(rows[0]);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCourse = async (req, res) => {
    const { course_code, course_name, user_id, dept_id } = req.body; 

    // Check if the user exists
    const [userRows] = await pool.query('SELECT id FROM users WHERE id = ?', [user_id]);
    if (userRows.length === 0) {
        return res.status(400).json({ error: 'Invalid user_id, user does not exist' });
    }

    // Check if the department exists
    const [deptRows] = await pool.query('SELECT dept_id FROM departments WHERE dept_id = ?', [dept_id]);
    if (deptRows.length === 0) {
        return res.status(400).json({ error: 'Invalid dept_id, department does not exist' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO courses (course_code, course_name, user_id, dept_id) VALUES (?, ?, ?, ?)', 
            [course_code, course_name, user_id, dept_id] // Ensure proper variable names here
        );
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { course_code, course_name, user_id, dept_id } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE courses SET course_code = ?, course_name = ?, user_id = ?, dept_id = ? WHERE course_id = ?', 
            [course_code, course_name, user_id, dept_id, id]
        );

        console.log(`Affected rows: ${result.affectedRows}`);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {getAllcourses, getCourseById, createCourse, updateCourse, deleteCourse};