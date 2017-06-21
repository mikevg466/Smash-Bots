const router = require('express').Router();


router.use('/users', require('./users'));


router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
