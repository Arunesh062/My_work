const express = require('express');
const router = express.Router();
const { generateToken } = require('../middleware/auth');

// In-memory store for demo (replace with Firebase in production)
const users = new Map();

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  try {
    const { name, email, password, currentWeight, targetWeight } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    if (users.has(email)) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const user = {
      uid: `user_${Date.now()}`,
      name,
      email,
      currentWeight: currentWeight || 55,
      targetWeight: targetWeight || 70,
      calorieGoal: 3000,
      streak: 0,
      createdAt: new Date().toISOString(),
    };

    users.set(email, { ...user, password });
    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed.' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const stored = users.get(email);
    if (!stored || stored.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const { password: _, ...user } = stored;
    const token = generateToken(user);

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed.' });
  }
});

// POST /api/auth/google
router.post('/google', (req, res) => {
  try {
    const { uid, email, name } = req.body;

    let user = users.get(email);
    if (!user) {
      user = { uid, name, email, currentWeight: 55, targetWeight: 70, calorieGoal: 3000, streak: 0 };
      users.set(email, user);
    }

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Google auth failed.' });
  }
});

module.exports = router;
