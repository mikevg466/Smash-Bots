import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

const db = require('../../server/db');
const User = require('../../server/db/models/user');
const Item = require('../../server/db/models/item');

const testUser = { 
  username: 'deathbots',
  email: 'deathbots@bots.com',
  password: 'bots',
  gold: 1000,
  level: 10,
  exp: 5000
};

const testItemList = [{ 
    name: 'Sword',
    graphic: 'http://www.darksword-armory.com/medieval-weapon/medieval-swords/the-warmonger/',
    price: 100
  },
  {
    name: 'Helmet',
    graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
    price: 200
  }]

describe('User Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState().user).to.be.deep.equal({
      username: '',
      email: '',
      password: '',
      gold: 0,
      level: 0,
      exp: 0,
      purchasedItems: [],
      equippedWeapon: {},
      equippedArmor: {},
    });
  });

  // purchase item
  // equip weapon
  // equip armor
  // load equipped
  // load purchased

  describe('LOAD_USER', () => {
    it('sets the user to the input user', () => {
      testStore.dispatch({ 
        type: 'LOAD_USER', 
        user: testUser,
      });
      const newState = testStore.getState().user;
      Object.keys(testUser).forEach(key => {
        expect(newState[key]).to.equal(testUser[key])
      })
    });
  }); // end describe('LOAD_USER')

  describe('LOAD_EQUIPPED', () => {
    it('sets the equipped armor and weapon', () => {
      testStore.dispatch({
        type: 'LOAD_EQUIPPED',
        equippedWeapon: testItemList[0],
        equippedArmor: testItemList[1]
      })
      const newState = testStore.getState().user;
      expect(newState.equippedWeapon).to.equal(testItemList[0]);
      expect(newState.equippedArmor).to.equal(testItemList[1])
    })
  })// end describe('LOAD_EQUIPPED')

  describe('EQUIP_WEAPON', () => {
    it('equips a weapon for a user', () => {
      testStore.dispatch({
        type: 'EQUIP_WEAPON',
        equippedWeapon: testItemList[0]
      })
      const newState = testStore.getState().user;
      expect(newState.equippedWeapon).to.equal(testItemList[0]);
    })
  })// end describe('EQUIP_WEAPON')

  describe('EQUIP_ARMOR', () => {
    it('equips a armor for a user', () => {
      testStore.dispatch({
        type: 'EQUIP_ARMOR',
        equippedArmor: testItemList[1]
      })
      const newState = testStore.getState().user;
      expect(newState.equippedArmor).to.equal(testItemList[1]);
    })
  })// end describe('EQUIP_ARMOR')

  describe('LOAD_PURCHASED', () => {
    it('sets the purchsed armor and weapon', () => {
      testStore.dispatch({
        type: 'LOAD_PURCHASED',
        purchasedItems: [testItemList[0],testItemList[1]]
      })
      const newState = testStore.getState().user;
      expect(newState.purchasedItems).to.be.an('array')
      expect(newState.purchasedItems).to.be.a.lengthOf(2)
      expect(newState.purchasedItems).to.deep.equal(testItemList);
    })
  })// end describe('LOAD_PURCHASED')

  describe('PURCHASE_ITEM', () => {
    it('adds an item to purchasedItem array', () => {
      testStore.dispatch({
        type: 'PURCHASE_ITEM',
        item: testItemList[0]
      })
      const newState = testStore.getState().user;
      expect(newState.purchasedItems).to.be.an('array')
      expect(newState.purchasedItems).to.be.a.lengthOf(1)
      expect(newState.purchasedItems[0]).to.deep.equal(testItemList[0])
    })
  }) // end describe('PURCHASE_ITEM')

}); // end describe('User reducer')
