const { adminLogin, adminLogout } = require("../controllers/adminController");
const { createCourse, getAllCourses, getCourse, editCourse, deleteCourse } = require("../controllers/course");
const { getAllUser } = require("../controllers/userController");
const { verifyAdminToken } = require("../middlewares/verifyToken");

const router = require("express").Router()


router.post("/login",adminLogin)

router.post("/logout",adminLogout)

router.post("/createCourse",verifyAdminToken,createCourse)

router.get("/getAllCourses",verifyAdminToken,getAllCourses)

router.get("/getCourse/:id",verifyAdminToken,getCourse)

router.put("/editCourse/:id",verifyAdminToken,editCourse)

router.delete("/deleteCourse/:id",verifyAdminToken,deleteCourse)

router.get("/getAllStudents",verifyAdminToken,getAllUser)

module.exports = router;