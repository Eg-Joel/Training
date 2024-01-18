
const bcrypt = require("bcryptjs");
const errorHandler = require("../middlewares/error")
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../models/user");

exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
   
    try {
      const admin = await findUserByEmail(email);
      if (!admin) return next(errorHandler(404, "User not found!"));
      if (admin.is_admin === false) {
        return next(errorHandler(403, "Admin access required"));
    }

      const validPassword = bcrypt.compareSync(password, admin.password);
      if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
      const token = jwt.sign({ id: admin._id, is_admin: true}, process.env.JWT_SECRET);
      const { password: pass, ...rest } = admin;
       res.status(200).json({rest,token});
    } catch (error) {
      next(error);
    }
  };
  
  exports.adminLogout = async (req, res, next) => {
    try {
      res.clearCookie('admin_access_token');
      res.status(200).json('Admin has been logged out!');
    } catch (error) {
      next(error);
    }
  };