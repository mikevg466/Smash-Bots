import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

describe('Game Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  const testLocalPlayer = {
    number: 2,
    damage: 110,
    xCoord: 110,
    yCoord: 110,
    lives: 3,
    animation: 'swing',
    isHit: false,
    flyRigh: false,
    characterGraphic: 'newSpritePath',
    weaponGraphic: 'newSpritePath'
  };

  const testRemotePlayers = {
    1: {
      number: 1,
      damage: 50,
      xCoord: 10,
      yCoord: 10,
      lives: 2,
      animation: 'stop',
      isHit: true,
      flyRigh: true,
      characterGraphic: 'newSpritePath',
      weaponGraphic: 'newSpritePath'
    },
    3: {
      number: 3,
      damage: 20,
      xCoord: 2,
      yCoord: 2,
      lives: 1,
      animation: 'left',
      isHit: true,
      flyRigh: false,
      characterGraphic: 'newSpritePath',
      weaponGraphic: 'newSpritePath'
    }
  }

  it('has expected initial state', () => {
    expect(testStore.getState().game).to.be.deep.equal({
      activePlayers: 4,
      isGamePlaying: false,
      playerNumber: 0,
      localPlayer: {},
      remotePlayers: {},
      playerStateChanges: {},
      winner: "",
    });
  });

  describe('START_GAME', () => {
    it('changes the isGamePlaying boolean to true', () => {
      testStore.dispatch({ type: 'START_GAME' });
      expect(testStore.getState().game.isGamePlaying).to.be.true;
    });
  }); // end describe('START_GAME')

  describe('END_GAME', () => {
    it('changes the isGamePlaying boolean to false', () => {
      testStore.dispatch({ type: 'END_GAME' });
      expect(testStore.getState().game.isGamePlaying).to.be.false;
    });
  }); // end describe('END_GAME')

  describe('UPDATE_PLAYERS_STATE', () => {
    beforeEach(() => testStore.dispatch({
      type: 'UPDATE_PLAYERS_STATE',
      localPlayer: testLocalPlayer,
      remotePlayers: testRemotePlayers
    }));
    it('changes all remote players states to the new states', () => {
      expect(testStore.getState().game.remotePlayers).to.deep.equal(testRemotePlayers);
    });
    it('only updates attack info for the local players state', () => {
      const storePlayer = testStore.getState().game.localPlayer;
      expect(storePlayer.damage).to.equal(testLocalPlayer.damage);
      expect(storePlayer.isHit).to.equal(testLocalPlayer.isHit);
      expect(storePlayer.flyRight).to.equal(testLocalPlayer.flyRight);
      const equalKeys = ['damage', 'isHit', 'flyRight'];
      Object.keys(storePlayer).forEach(key => {
        if(!equalKeys.includes(key))
          expect(storePlayer[key]).to.not.equal(testLocalPlayer[key]);
      });
    });
  }); // end describe('UPDATE_PLAYERS_STATE')

  describe('SET_PLAYER', () => {
    it('changes the playerNumber state to the given player number', () => {
      testStore.dispatch({ type: 'SET_PLAYER', playerNumber: testLocalPlayer.number });
      expect(testStore.getState().game.playerNumber).to.equal(testLocalPlayer.number);
    });
  }); // end describe('SET_PLAYER')

  describe('INIT_PLAYERS', () => {
    it('changes the localPlayer and remotePlayers states to the given state', () => {
      testStore.dispatch({
        type: 'INIT_PLAYERS',
        localPlayer: testLocalPlayer,
        remotePlayers: testRemotePlayers
      });
      expect(testStore.getState().game.localPlayer).to.deep.equal(testLocalPlayer);
      expect(testStore.getState().game.remotePlayers).to.deep.equal(testRemotePlayers);
    });
  }); // end describe('INIT_PLAYERS')

  describe('UPDATE_LOCAL_STATE', () => {
    beforeEach(() => testStore.dispatch({
      type: 'UPDATE_LOCAL_STATE',
      localPlayer: testLocalPlayer,
      remotePlayers: testRemotePlayers
    }));
    it('adds only lives, animation, x and y coordinates for localPlayer to the playerStateChanges object', () => {
      const storePlayer = testStore.getState().game.playerStateChanges[testLocalPlayer.number];
      expect(storePlayer.xCoord).to.equal(testLocalPlayer.xCoord);
      expect(storePlayer.yCoord).to.equal(testLocalPlayer.yCoord);
      expect(storePlayer.animation).to.equal(testLocalPlayer.animation);
      expect(storePlayer.lives).to.equal(testLocalPlayer.lives);
      const equalKeys = ['xCoord', 'yCoord', 'animation', 'lives'];
      Object.keys(storePlayer).forEach(key => {
        if(!equalKeys.includes(key))
          expect(storePlayer[key]).to.not.equal(testLocalPlayer[key]);
      });
    });
    it('adds only damage for remotePlayers to the playerStateChanges object', () => {
      const storePlayer = testStore.getState().game.playerStateChanges;
      Object.keys(testRemotePlayers).forEach(playerNum => {
        expect(storePlayer[playerNum].damage).to.equal(testRemotePlayers[playerNum].damage);
      });
      Object.keys(storePlayer[testLocalPlayer.number]).forEach(key => {
        if(key !== 'damage')
          expect(storePlayer[key]).to.not.equal(testLocalPlayer[key]);
      });
    });
  }); // end describe('UPDATE_LOCAL_STATE')

}); // end describe('Item reducer')
