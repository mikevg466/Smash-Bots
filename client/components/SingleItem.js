import React from 'react';
import PropTypes from 'prop-types';

export default const SingleItem = props => {

  const { graphic, name, price } = props.selectedItem;

  return (
    <div>
      <img src={graphic} />
      <button data={price} />
      <h3>{name}</h3>
    </div>
  )
}


SingleItem.propTypes = {
  selectedItem.name: PropTypes.string.isRequired,
  selectedItem.graphic: PropTypes.string.isRequired,
  selectedItem.price: PropTypes.number.isRequired
};
