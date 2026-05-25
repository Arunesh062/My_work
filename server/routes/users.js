const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// GET /api/users/profile
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/users/profile
router.put('/profile', authMiddleware, (req, res) => {
  const { name, currentWeight, targetWeight, calorieGoal, waterGoal, height } = req.body;
  const updatedUser = {
    ...req.user,
    ...(name && { name }),
    ...(currentWeight && { currentWeight }),
    ...(targetWeight && { targetWeight }),
    ...(calorieGoal && { calorieGoal }),
    ...(waterGoal && { waterGoal }),
    ...(height && { height }),
  };
  res.json({ user: updatedUser, message: 'Profile updated successfully.' });
});

module.exports = router;
