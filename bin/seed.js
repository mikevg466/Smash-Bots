
const db = require('../server/db/db');
const Page = require('../server/db/models').Page;
const Promise = require('bluebird');

const data = {
  item: [
    {
    name: 'Thor\'s Hammer',
    graphic: 'ourAssets/weapons/hammer_thors.png',
    image: 'http://orig07.deviantart.net/a821/f/2013/251/c/7/thor_hammer_mjolnir__avengers_version__by_pannaus-d6lir5n.jpg',
    price: 0,
    type: 'weapon',
    description: 'I shoot thunder at my foes',
    power: 5,
    unlockLevel: 12

  },
  {
    name: 'Sword',
    graphic: 'ourAssets/weapons/hammer_thors.png',
    image: 'http://store.hbo.com/imgcache/product/resized/000/499/553/catl/game-of-thrones-longclaw-letter-opener_1000.jpg?k=2f027467&pid=499553&s=catl&sn=hbo',
    price: 20,
    type: 'weapon',
    description: 'Very Sharp',
    power: 5,
    unlockLevel: 12
  },
  // {
  //   name: 'Axe',
  //   graphic: 'ourAssets/weapons/hammer_thors.png',
  //   image: 'https://openclipart.org/download/85753/Axe-001.svg',
  //   price: 10000,
  //   type: 'weapon',
  //   description: 'You have my hammer',
  //   power: 5,
  //   unlockLevel: 12
  // },
  {
    name: 'Lightsaber',
    graphic: 'ourAssets/weapons/hammer_thors.png',
    image: 'https://target.scene7.com/is/image/Target/17131120?wid=520&hei=520&fmt=pjpeg',
    price: 550,
    type: 'weapon',
    description: 'may the force be with you',
    power: 5,
    unlockLevel: 12
  },
  {
    name: 'Fly Swatter',
    graphic: 'ourAssets/weapons/hammer_thors.png',
    image: 'http://graphics8.nytimes.com/images/2012/05/27/magazine/27wmt/27wmt-articleLarge.jpg',
    price: 50,
    type: 'weapon',
    description: 'You have my swatter',
    power: 5,
    unlockLevel: 12
  }

  ]
};


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting seed data");
  return Promise.map(Object.keys(data), name => {
    return Promise.map(data[name], item => {
      return db.model(name).create(item);
    });
  });
})
.then(() => {
  console.log("Finished inserting seed data");
})
.catch(console.error.bind(console))
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});
