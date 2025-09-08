import express from  'express';

const baseRouter = express.Router();

baseRouter.get('/', function(_request, response) {
  response.send('Cocktail Keeper API');
});

export default baseRouter;
