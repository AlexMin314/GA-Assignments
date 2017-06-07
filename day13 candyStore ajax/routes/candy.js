import express from 'express';
import candyController from '../controller/candystore';

const router = express.Router();

/* List candies */
router.get('/', (req, res, next) => {
  res.json(candyController.list());
});

/* create candies */
router.post('/', (req, res, next) => {
  const newCandy = candyController.create(req.body);
  res.json(newCandy);
});

/* get candies */
router.get('/:id', (req, res, next) => {
  const candyId = req.params.id;
  res.json(candyController.get(candyId));
});

/* update candies */
router.put('/', (req, res, next) => {
  const newCandy = candyController.update(req.body);
  res.json(newCandy);
});

/* delete candies */
router.delete('/:id', (req, res, next) => {
  const candyId = req.params.id;
  res.json(candyController.delete(candyId));
});

export default router;
