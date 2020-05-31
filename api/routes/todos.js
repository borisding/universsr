import express from 'express';
import todosData from '../../assets/mocks/db.json';

const todosRoutes = express.Router();

todosRoutes.get('/todos', (req, res) => {
  res.json(todosData);
});

export default todosRoutes;
