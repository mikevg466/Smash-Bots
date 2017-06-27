import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

const db = require('../../server/db');
const Item = require('../../server/db/models/item');

describe('Items Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  const testItemsList = [
    { name: 'Sword',
      graphic: 'http://www.darksword-armory.com/medieval-weapon/medieval-swords/the-warmonger/',
      price: 100,
      type: 'weapon',
      description: 'I am very sharp',
      power: 4,
      unlockLevel: 2
    },
    {
      name: 'Axe',
      graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
      price: 200,
      type: 'weapon',
      description: 'I am mighty',
      power: 5,
      unlockLevel: 4
    }
  ];

  before('Load db with test data', () => {
    return db.sync({ force: true })
    .then(() => Promise.all([
      Item.create(testItemsList[0]),
      Item.create(testItemsList[1])
    ]))
  });

  it('has expected initial state', () => {
    expect(testStore.getState().item).to.be.deep.equal({
      itemsList: [],
      selectedItem: {},
    });
  });

  describe('LOAD_ITEMS', () => {
    it('sets the itemsList to the input array', () => {
      testStore.dispatch({ type: 'LOAD_ITEMS', itemsList: [{ name: 'Sword' }, { name: 'Axe' }] });
      const newState = testStore.getState().item;
      expect(newState.itemsList[0]).to.deep.equal({ name: 'Sword' });
      expect(newState.itemsList[1]).to.deep.equal({ name: 'Axe' });
    });
  }); // end describe('LOAD_ITEMS')

  describe('SELECT_ITEM', () => {
    it('sets the selectedItem to the input object', () => {
      testStore.dispatch({ type: 'SELECT_ITEM', selectedItem: { name: 'Sword' } });
      const newState = testStore.getState().item;
      expect(newState.selectedItem).to.deep.equal({ name: 'Sword' });
    });
  }); // end describe('SELECT_ITEM')
}); // end describe('Item reducer')
