const express = require('express');
const todos = require('@resources/fixtures/todos');

// records should be reading from db for real world app
// can add more http verbs request for complete CRUD
todosRouter = express.Router();
todosRouter.get('/todos', (req, res) => {
  res.json(todos);
});

module.exports = todosRouter;
