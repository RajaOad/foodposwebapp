// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require("../models/User");
const secretKey = process.env.SECRET_KEY;
const AdminUser = require('../models/Admin');

const requireAuth = async (req, res, next) => {
  let token;
  const authToken = req.headers.authorization;
  
  if(authToken) {
    token = authToken.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify JWT token
    const decodedToken = jwt.verify(token, secretKey);

    let dbUser;

    if(decodedToken.isAdmin) {

    const admin = await AdminUser.findById(decodedToken.id);

    if (!admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    dbUser = admin;


    } else {
          // Fetch the user from the database using the decoded token's user ID
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    dbUser = user;

    }


    // Attach the user to the request object for further use in the route handlers
    req.user = dbUser;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth;
