const { expect } = require('chai');
const db = require('../../server/db');
const User = db.model('user');
const Item = db.model('item');

describe('User model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Item Associations', () => {
    let mike, testItems;
    const testList = [
      {
        name: 'Thor\'s Hammer',
        graphic: 'http://test.com',
        price: 500
      },
      {
        name: 'Sword',
        graphic: 'http://test2.com',
        price: 20
      },
      {
        name: 'Axe',
        graphic: 'http://test3.com',
        price: 10000
      }
    ];

    beforeEach('load Items and a User', () => {
      return Promise.all([
        User.create({
          name: 'Mike',
          email: 'mike.com',
          password: 'test'
        }),
        Item.create(testList[0]),
        Item.create(testList[1]),
        Item.create(testList[2])
      ])
      .then(([user, itemOne, itemTwo, itemThree]) => {
        mike = user;
        testItems = [itemOne, itemTwo, itemThree];
      });
    });

    it('User can associate to items they own', () => {
      return Promise.all([
        mike.addItem(testItems[0]),
        mike.addItem(testItems[1]),
        mike.addItem(testItems[2])
      ])
      .then(() => mike.getItem())
      .then(userItemsList => {
        expect(userItemsList).to.be.an('array');
        expect(userItemsList).to.have.a.lengthOf(3);
        expect(userItemsList[0].name).to.equal(testItems[0].name);
        expect(userItemsList[2].name).to.equal(testItems[2].name);
      });
    });
  });
});
