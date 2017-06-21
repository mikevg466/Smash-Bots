// import React from 'react';
// import {expect} from 'chai';
// import {shallow} from 'enzyme';
// import {spy} from 'sinon';

import SingleItem from '../../client/components/SingleItem';

describe('Item component', () => {

  let singleItem;
  const selectedItem = {
    name: 'Sword',
    image: 'http://www.darksword-armory.com/medieval-weapon/medieval-swords/the-warmonger/',
    price: 100
  };

  beforeEach('Create component', () => {
    singleItem = shallow(
      <SingleItem
        selectedItem={selectedItem}
      />
    );
  });

  it('should be a div with an image object, button, and heading', () => {
    expect(singleItem.is('div')).to.equal(true);
    expect(singleItem.find('img').length).to.equal(1);
    expect(singleItem.find('button').length).to.equal(1);
    expect(singleItem.find('h3').length).to.equal(1);
  });
  it('image should use the seletedItem\'s url', () => {
    expect(singleItem.find('img').prop('src')).to.equal(selectedItem.image);
  });
  it('button data should display selectedItem\'s price', () => {
    expect(singleItem.find('button').prop('data')).to.equal(selectedItem.price);
  });
  it('heading should display the selectItem\'s name', () => {
    expect(singleItem.find('h3')).to.have.html('<h3>Sword</h3>');
  });
}); // end describe ('SingleItem component');
