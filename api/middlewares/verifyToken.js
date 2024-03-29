const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
 
    if (!token) return next(errorHandler(401, 'Unauthorized'));
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(403, 'Forbidden'));
  
      req.user = user;
      next()
    })
  };
  const verifyAdminToken = (req, res, next) => {
    const token = req.headers.token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        const user = decoded;

        if (user && user.is_admin) {
            req.user = user;
            next();
        } else {
            return next(errorHandler(403, 'Forbidden - Admin access required'));
        }
    });
};
  module.exports = { verifyToken, verifyAdminToken }