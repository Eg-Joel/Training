const pool = require('../pool')
const errorHandler = require("../middlewares/error");

const createCourse = async (name, description) => {
    const query = "INSERT INTO courses(name, description) VALUES($1, $2) RETURNING *";
    const values = [name, description];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw errorHandler(500, 'Error creating course: Internal Server Error');
    }
  };

  const getAllCourses = async (limit, offset) => {
    const query = "SELECT * FROM courses LIMIT $1 OFFSET $2";
  
    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw errorHandler(500, 'Error getting all courses: Internal Server Error');
    }
  };

  const getCourseById = async (id) => {
    const query = "SELECT * FROM courses WHERE id = $1";
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw errorHandler(500, 'Error getting course by ID: Internal Server Error');
    }
  };

  const getTotalCourses = async () => {
    const query = "SELECT COUNT(*) FROM courses";
  
    try {
      const result = await pool.query(query);
      return result.rows[0].count;
    } catch (error) {
      console.error("Error getting total courses:", error);
      throw errorHandler(500, 'Error getting total courses: Internal Server Error');
    }
  };
  
const updateCourse = async (id, name, description) => {
    const query = "UPDATE courses SET name = $2, description = $3 WHERE id = $1 RETURNING *";
    const values = [id, name, description];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw errorHandler(500, 'Error updating course: Internal Server Error');
    }
  };
  
  const deleteCourse = async (id) => {
    const query = "DELETE FROM courses WHERE id = $1 RETURNING *";
    const values = [id];
  
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw errorHandler(500, 'Error deleting course: Internal Server Error');
    }
  };
  module.exports = {
    createCourse,
    getCourseById,
    getAllCourses,
    updateCourse,
    deleteCourse,
    getTotalCourses
  };