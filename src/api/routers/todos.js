import express from 'express';
import todos from '@resources/fixtures/todos';

// records should be reading from db for real world app
// can add more http verbs request for complete CRUD
const todosRouter = express.Router();
todosRouter.get('/todos', (req, res) => {
  res.json(todos);
});

export default todosRouter;
