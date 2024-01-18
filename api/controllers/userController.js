
const bcrypt = require("bcryptjs");
const errorHandler = require("../middlewares/error")
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, getAllUsers } = require("../models/user");

exports.userSignup = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await createUser(name, email, hashPassword);

      res.status(201).json("user created successsfully");
    } catch (error) {
      next(error);
    }
  };

  exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body;
   
    try {
      const user = await findUserByEmail(email);
      if (!user) return next(errorHandler(404, "User not found!"));
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user;
       res.status(200).json({rest,token});
    } catch (error) {
      next(error);
    }
  };
  
  exports.userLogout = async (req, res, next) => {
    try {
      res.clearCookie('user_access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  }

  
  exports.getAllUser = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 5;
      const offset = (page - 1) * limit;
  
      const users = await getAllUsers(limit, offset);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };