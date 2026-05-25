const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// In-memory store for demo
const mealsStore = new Map();

// GET /api/meals
router.get('/', authMiddleware, (req, res) => {
  const userMeals = mealsStore.get(req.user.uid) || [];
  res.json({ meals: userMeals });
});

// POST /api/meals
router.post('/', authMiddleware, (req, res) => {
  const { title, time, calories, emoji } = req.body;
  const meal = {
    id: `meal_${Date.now()}`,
    title,
    time,
    calories: calories || 0,
    emoji: emoji || '🍽️',
    completed: false,
    enabled: true,
    createdAt: new Date().toISOString(),
  };

  const userMeals = mealsStore.get(req.user.uid) || [];
  userMeals.push(meal);
  mealsStore.set(req.user.uid, userMeals);

  res.status(201).json({ meal });
});

// PUT /api/meals/:id
router.put('/:id', authMiddleware, (req, res) => {
  const userMeals = mealsStore.get(req.user.uid) || [];
  const index = userMeals.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Meal not found.' });

  userMeals[index] = { ...userMeals[index], ...req.body };
  mealsStore.set(req.user.uid, userMeals);
  res.json({ meal: userMeals[index] });
});

// DELETE /api/meals/:id
router.delete('/:id', authMiddleware, (req, res) => {
  let userMeals = mealsStore.get(req.user.uid) || [];
  userMeals = userMeals.filter(m => m.id !== req.params.id);
  mealsStore.set(req.user.uid, userMeals);
  res.json({ message: 'Meal deleted.' });
});

module.exports = router;
