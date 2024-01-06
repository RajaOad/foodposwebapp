// isAdmin.js

const AdminUser = require('../models/Admin'); // AdminUser model

const isAdmin = async (req, res, next) => {
  try {
    // Get the user ID from the request object
    const userId = req.user._id;

    // Find the user by ID and check if they are an admin
    const admin = await AdminUser.findById(userId);

    if (!admin) {
      return res.status(401).json({ error: 'User not found' });
    }

    // If the user is an admin, proceed to the next middleware/route handler
    if (admin.isAdmin) {
      next();
    } else {
      // If not an admin, send a forbidden error
      return res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = isAdmin;
