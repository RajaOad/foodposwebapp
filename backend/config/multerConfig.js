const multer = require("multer");

// Define storage for the images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/uploads/');  // Destination directory for uploads
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);  // Unique filename
    }
  });
  
  // Filter to accept only certain filetypes (e.g., images)
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5  // Limiting file size to 5 MB
    },
    fileFilter: fileFilter
  });

  module.exports = upload;
