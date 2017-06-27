const router = require('express').Router();
const User = require('../db/models/user');
const Item = require('../db/models/item');

module.exports = router;

router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});


/****-----   Root    -----*****/
router.get('/', (req, res, next) => {
  //login -- to revise later
  if(Object.keys(req.query).length){
    User.findOne({
      where: {
        email: req.query[email],
        password: req.query[password]
      }
    })
      .then(user => res.status(200).json(user))
      .catch(next);
  //get all users
  } else{
    User.findAll()
      .then(users => res.status(200).json(users))
      .catch(next);
  }
});

/****-----   Create User    -----*****/
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


/****-----   Get Single User    -----*****/
router.get('/:fullUserId', (req, res, next) => {
  User.findById(req.params.fullUserId, { include: [{ model: Item }, { all: true }] })
    .then(user => res.status(200).json(user))
    .catch(next);
})



/****-----   Delete User    -----*****/
router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(() => res.status(204).send('User Deleted!'))
    .catch(next);
})


/****-----   User Info    -----*****/
// get user's name
router.get('/name/:userId', (req, res, next) => {
  res.status(200).json(req.user.name);
});

// get user's email
router.get('/email/:userId', (req, res, next) => {
  res.status(200).json(req.user.email);
});

/****-----   Item associations    -----*****/
router.post('/:userId/items', (req, res, next) => {
  Item.findById(req.body.id)
    .then(item => req.user.addItem(item))
    .then(() => User.findById(req.user.id, { include: [{ model: Item }, { all: true }] }))
    .then(user => res.status(201).json(user))
    .catch(next);
});

router.post('/:userId/weapon', (req, res, next) => {
  console.log('req body id', req.body);
  Item.findById(req.body.id)
    .then(item => req.user.setWeapon(item))
    // .then(item => console.log("=======>", item))
    // .then(() => req.user.getWeapon())
    // .then(() => User.findById(req.user.id))
    .then(() => User.findById(req.user.id, { include: [{ model: Item }, { model: Item, as: 'weapon' }, { model: Item, as: 'armor' }] }))
    // .then(user => console.log(user))
    .then(user => res.status(201).json(user))
    .catch(next);
});

router.post('/:userId/armor', (req, res, next) => {
  Item.findById(req.body.id)
    .then(item => req.user.setArmor(item))
    .then(() => User.findById(req.user.id, { include: [{ model: Item }, { model: Item, as: 'weapon' }, { model: Item, as: 'armor' }] }))
    .then(user => res.status(201).json(user))
    .catch(next);
});

/****-----   Update User Attributes    -----*****/
router.put('/:userId/gold', (req, res, next) => {
  req.user.update({ gold: req.body.gold })
    .then(() => User.findById(req.user.id))
    .then(user => res.status(200).json(user))
    .catch(next);
});

router.put('/:userId/level', (req, res, next) => {
  req.user.update({ level: req.body.level })
    .then(() => User.findById(req.user.id))
    .then(user => res.status(200).json(user))
    .catch(next);
})

router.put('/:userId/experience', (req, res, next) => {
  req.user.update({ experience: req.body.experience })
    .then(() => User.findById(req.user.id))
    .then(user => res.status(200).json(user))
    .catch(next);
})
