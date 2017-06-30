const { expect } = require('chai');
const db = require('../../server/db');
const model = require('../../server/db/models');
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
        graphic: 'ourAssets/weapons/hammer_thors.png',
        image: 'http://test.com',
        price: 500,
        type: 'weapon',
        description: 'I shoot thunder at my foes',
        power: 5,
        unlockLevel: 12
      },
      {
        name: 'Sword',
        graphic: 'ourAssets/weapons/hammer_thors.png',
        image: 'http://test2.com',
        price: 20,
        type: 'weapon',
        description: 'I shoot thunder at my foes',
        power: 5,
        unlockLevel: 12
      },
      {
        name: 'Axe',
        graphic: 'ourAssets/weapons/hammer_thors.png',
        image: 'http://test3.com',
        price: 10000,
        type: 'weapon',
        description: 'I shoot thunder at my foes',
        power: 5,
        unlockLevel: 12
      }
    ];

    beforeEach('load Items and a User', () => {
      return Promise.all([
        User.create({
          name: 'Mike',
          email: 'mike.com',
          password: 'test',
          username: "mike01"
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
      .then(() => mike.getItems())
      .then(userItemsList => {
        expect(userItemsList).to.be.an('array');
        expect(userItemsList).to.have.a.lengthOf(3);
        expect(userItemsList[0].name).to.equal(testItems[0].name);
        expect(userItemsList[2].name).to.equal(testItems[2].name);
      });
    });

    it('User can associate to item they have equipped as Weapon', () => {
      return mike.setWeapon(testItems[0])
        .then(() => User.findById(mike.id))
        .then(user => user.getWeapon())
        .then(weapon => {
          expect(weapon.name).to.equal(testList[0].name);
        })
    });

    it('User can associate to item they have equipped as Armor', () => {
      return mike.setArmor(testItems[1])
        .then(() => User.findById(mike.id))
        .then(user => user.getArmor())
        .then(armor => {
          expect(armor.name).to.equal(testList[1].name);
        })
    });

  }); // describe('Item Associations')
}); // describe('User model')
