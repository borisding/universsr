const express = require('express');
const router = express.Router();
const todos = require('../../fixtures/data/todos');

router.get('/', (req, res) => {
  res.json({
    message: 'Hello! I am from API response.'
  });
});

// records should be reading from db for real world app
// can add more http verbs request for complete CRUD
router.get('/todos', (req, res) => {
  res.json(todos);
});

module.exports = router;
