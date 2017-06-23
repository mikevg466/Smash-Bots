import React from 'react';
import chai, {expect} from 'chai';
import spies from require('chai-spies');
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import Character from '../../client/containers/Character';

chai.use(spies);
const spyWeaponChange = chai.spy(() => {});
const spyArmorChange = chai.spy(() => {});
const spyHandleSubmit = chai.spy(() => {});

const weaponList = [
  {
    id: 1,
    name: 'Sword',
    graphic: 'http://www.darksword-armory.com/medieval-weapon/medieval-swords/the-warmonger/',
    price: 100
  },
  {
    id: 2,
    name: 'Axe',
    graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
    price: 200
  }
];

const armorList = [
  {
    id: 3,
    name: 'Helmet',
    graphic: 'http://www.darksword-armory.com/medieval-weapon/medieval-swords/the-warmonger/',
    price: 100
  },
  {
    id: 4,
    name: 'Shield',
    graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
    price: 200
  }
]

const equippedWeapon = weaponList[0];
const equippedArmor = armorList[1];


describe('Character container', () => {

  beforeEach('Create container', () => {
    characterComponent = shallow(
      <Character
        weaponList={ weaponList }
        armorList={ armorList }
        equippedWeapon={ equippedWeapon }
        equippedArmor={ equippedArmor }
        handleWeaponChange={ spyWeaponChange }
        handleArmorChange={ spyArmorChange }
        handleSubmit={ spyHandleSubmit }
      />
    );
  });

  it('should be a div with two dropdown lists to change weapon and armor', () => {
    expect(characterComponent.is('div')).to.equal(true);
    expect(characterComponent.find('select').length).to.equal(2);
    expect(characterComponent.find('option').length).to.equal(4);
    expect(characterComponent.find('a').length).to.equal(1);
  });

  it('Weapon select should have the weaponList items for options and each option should have a value of the item id', () => {
    expect(characterComponent.find('option').at(0).to.have.html('<option value=1>Sword</option>'))
    expect(characterComponent.find('option').at(1).to.have.html('<option value=2>Axe</option>'))
  });

  it('Armor select should have the armorList items for options and each option should have a value of the item id', () => {
    expect(characterComponent.find('option').at(2).to.have.html('<option value=3>Helmet</option>'))
    expect(characterComponent.find('option').at(3).to.have.html('<option value=4>Shield</option>'))
  });

  it('Select weapon should update state with handleChange', () => {
    singleItem.find('select').at(0).simulate('change');
    expect(spyWeaponChange).to.have.been.called();
  })

  it('Select armor should update state with handleChange', () => {
    singleItem.find('select').at(1).simulate('change');
    expect(spyArmorChange).to.have.been.called();
  })

  it('Button click should update database with equipped item state', () => {
    singleItem.find('a').simulate('click');
    expect(spyHandleSubmit).to.have.been.called();
  })

  it('Weapon select should have a defaultValue of the equippedWeapon', () => {
    expect(characterComponent.find('select').at(0).prop('defaultValue')).to.equal(1));
  });

  it('Armor select should have a defaultValue of the equippedArmor', () => {
    expect(characterComponent.find('select').at(1).prop('defaultValue')).to.equal(4));
  });
}); // end describe ('Character container');
