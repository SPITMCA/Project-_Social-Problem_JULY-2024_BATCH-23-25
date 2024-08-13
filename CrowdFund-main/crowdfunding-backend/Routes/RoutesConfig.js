// RoutesConfig.js
const express = require('express');
const router = express.Router();
const { signup, signin, getUsers, getUserFundraisers } = require('../Controllers/userController');
const { createFundraiser, fetchFundraiser, fetchPendingFundraisers, deleteFundraiser, approveFundraiser, declineFundraiser, suggestChanges, updateFundraiser } = require('../Controllers/fundraiserController');
const multer = require('multer');
const path = require('path');
const jwt  = require('jsonwebtoken'); 
const { contributeToFundraiser, exportFundraiserTransactions } = require('../Controllers/FundraiserTransactionController');
// const { exportFundraiserTransactions } = require('../Controllers/FundraiserTransactionController');



// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users', getUsers);

// Route for fetching user's fundraisers without authentication
// router.get('/my-fundraisers', async (req, res) => {
//   try {
//       const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer TOKEN'
//       if (!token) {
//           return res.status(401).json({ message: 'No token provided' });
//       }

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const userId = decoded.id;

//       // Fetch fundraisers created by this user
//       const myfundraisers = await fundraisers.find({ createdBy: userId });
//       res.status(200).json(myfundraisers);
//   } catch (error) {
//       console.error('Error fetching user fundraisers:', error);
//       res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/my-fundraisers', getUserFundraisers); 
router.post('/fundraisers', createFundraiser);
router.get('/fundraisers', fetchFundraiser);
router.get('/fundraisers/pending', fetchPendingFundraisers);
router.delete('/fundraisers/:id', deleteFundraiser);
router.post('/fundraisers/:id/approve', approveFundraiser);
router.post('/fundraisers/:id/decline', declineFundraiser);
router.post('/fundraisers/:id/suggest-changes', suggestChanges);
router.put('/fundraisers/:id', updateFundraiser); // Ensure this route is added

router.post('/contribute', contributeToFundraiser); 

router.get('/fundraisers/export/:fundraiserId', exportFundraiserTransactions);

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).send({ imageUrl });
});

module.exports = router;
