const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

const weightStore = new Map();

// GET /api/weight
router.get('/', authMiddleware, (req, res) => {
  const logs = weightStore.get(req.user.uid) || [];
  res.json({ weightLogs: logs });
});

// POST /api/weight
router.post('/', authMiddleware, (req, res) => {
  const { weight } = req.body;
  const log = {
    id: `wl_${Date.now()}`,
    weight: parseFloat(weight),
    date: new Date().toISOString().split('T')[0],
  };

  const logs = weightStore.get(req.user.uid) || [];
  logs.push(log);
  weightStore.set(req.user.uid, logs);

  res.status(201).json({ weightLog: log });
});

module.exports = router;
