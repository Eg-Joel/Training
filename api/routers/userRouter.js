const { getAllCourse } = require("../controllers/course");
const { userSignup, userLogin, userLogout, userL } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router()


router.post("/signup",userSignup)

router.post("/login",userLogin)

router.get("/logout",userLogout)

router.get("/getCourses",verifyToken,getAllCourse)




module.exports = router;