import express from 'express';

const testRouter = express.Router();

testRouter.get('/test', (req, res) => {
  res.json({ message: 'Hi! I am just a test data.' });
});

export default testRouter;
