const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Cloud folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

module.exports = { cloudinary, storage };
