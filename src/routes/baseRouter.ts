import express from  'express';

const baseRouter = express.Router();

baseRouter.get('/', function(req, res) {
  res.send('Cocktail Keeper API');
});

export default baseRouter;
