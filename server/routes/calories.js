const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

const calorieStore = new Map();

// GET /api/calories
router.get('/', authMiddleware, (req, res) => {
  const logs = calorieStore.get(req.user.uid) || [];
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter(l => l.date === today);
  res.json({ calorieLogs: todayLogs, allLogs: logs });
});

// POST /api/calories
router.post('/', authMiddleware, (req, res) => {
  const { foodName, calories } = req.body;
  const log = {
    id: `cal_${Date.now()}`,
    foodName,
    calories: parseInt(calories),
    date: new Date().toISOString().split('T')[0],
  };

  const logs = calorieStore.get(req.user.uid) || [];
  logs.push(log);
  calorieStore.set(req.user.uid, logs);

  res.status(201).json({ calorieLog: log });
});

// DELETE /api/calories/:id
router.delete('/:id', authMiddleware, (req, res) => {
  let logs = calorieStore.get(req.user.uid) || [];
  logs = logs.filter(l => l.id !== req.params.id);
  calorieStore.set(req.user.uid, logs);
  res.json({ message: 'Calorie log deleted.' });
});

module.exports = router;
