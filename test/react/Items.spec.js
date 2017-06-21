// import React from 'react';
// import {expect} from 'chai';
// import {shallow} from 'enzyme';
// import {spy} from 'sinon';

import Items from '../../client/components/Items';

describe('Items container', () => {

  let items;
  const itemsList = [
    { name: 'Sword',
      graphic: 'http://www.darksword-armory.com/medieval-weapon/medieval-swords/the-warmonger/',
      price: 100
    },
    {
      name: 'Axe',
      graphic: 'https://openclipart.org/download/85753/Axe-001.svg',
      price: 200
    }
  ];

  beforeEach('Create container', () => {
    items = shallow(
      <Items
        itemsList={itemsList}
      />
    );
  });

  it('should have one div with an unordered list, with two list items', () => {
    expect(items.is('div')).to.equal(true);
    expect(items.find('ul').length).to.equal(1);
    expect(items.find('li').length).to.equal(2);
    expect(items.find('SingleItem').length).to.equal(2);
  });

  it('should have Sword as the first single item component', () => {
    expect(items.find('SingleItem')[0].find('h3')).to.have.html('<h3>Sword</h3>');
  });
}); // end describe('Item container')
