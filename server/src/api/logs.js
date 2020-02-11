const { Router } = require('express');
const { LogEntry } = require('../models/logEntry');


const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: '⚡',
  });
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
