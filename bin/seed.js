
const db = require('../server/db/db');
const Page = require('../server/db/models').Page;
const Promise = require('bluebird');

const data = {
  item: [
    {
    name: 'Thor\'s Hammer',
    graphic: 'http://orig07.deviantart.net/a821/f/2013/251/c/7/thor_hammer_mjolnir__avengers_version__by_pannaus-d6lir5n.jpg',
    price: 500
  },
  {
    name: 'Sword',
    graphic: 'http://store.hbo.com/imgcache/product/resized/000/499/553/catl/game-of-thrones-longclaw-letter-opener_1000.jpg?k=2f027467&pid=499553&s=catl&sn=hbo',
    price: 20
  },
  {
    name: 'Axe',
    graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
    price: 10000
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
