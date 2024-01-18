
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require("../models/course");




exports.createCourse = async (req, res, next) => {
   console.log(req.body);
    const { name, description } = req.body;

  try {
    const newCourse = await createCourse(name, description);
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
  };

  exports.getAllCourses = async (req, res, next) => {
   
    try {
      const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const offset = (page - 1) * limit;
      const courses = await getAllCourses(limit, offset);
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  };

  exports.getCourse = async (req, res, next) => {
    const courseId = req.params.id;

    try {
      const course = await getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  };

  exports.editCourse = async (req, res, next) => {
    const courseId = req.params.id;
    const { name, description } = req.body;
  
    try {
      const updatedCourse = await updateCourse(courseId, name, description);
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(updatedCourse);
    } catch (error) {
      next(error);
    }
  };

  exports.deleteCourse = async (req, res, next) => {
    const courseId = req.params.id;

    try {
      const deletedCourse = await deleteCourse(courseId);
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(deletedCourse);
    } catch (error) {
      next(error);
    }
  };