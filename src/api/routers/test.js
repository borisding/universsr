const express = require('express');

testRouter = express.Router();
testRouter.get('/test', (req, res) => {
  res.json({ message: 'Hi! I am just a test data.' });
});

module.exports = testRouter;
