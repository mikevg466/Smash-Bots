const router = require('express').Router();
const Item = require('../db/models/item');

module.exports = router;

/****-----   Root    -----*****/
router.get('/', (req, res, next) => {

  Item.findAll()
    .then(foundItems => {
      res.json(foundItems);
    })
    .catch(next);
});

router.get('/:itemId', (req, res, next) => {
  Item.findById(req.params.itemId)
    .then(foundItem => {
      res.json(foundItem);
    })
    .catch(next);
});
