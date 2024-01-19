const pool = require("../pool");
const errorHandler = require("../middlewares/error");

const createUser = async (name, email, password) => {
  const query =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, password];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw errorHandler(
        500,
        "Error creating user: Database response is unexpected."
      );
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw errorHandler(500, "Error creating user: Internal Server Error");
  }
};

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw errorHandler(
      500,
      "Error finding user by email: Internal Server Error"
    );
  }
};

const getAllUsers = async (limit, offset) => {
  const query =
    "SELECT * FROM users WHERE is_admin = false ORDER BY id LIMIT $1 OFFSET $2";

  try {
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  } catch (error) {
    console.error("Error getting users:", error);
    throw errorHandler(500, "Error getting users: Internal Server Error");
  }
};

const getTotalUsers = async () => {
  const query = "SELECT COUNT(*) FROM users WHERE is_admin = false";

  try {
    const result = await pool.query(query);
    return result.rows[0].count;
  } catch (error) {
    console.error("Error getting total users:", error);
    throw errorHandler(500, "Error getting total users: Internal Server Error");
  }
};

module.exports = { createUser, findUserByEmail, getAllUsers, getTotalUsers };
