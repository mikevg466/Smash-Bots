import React from 'react';
import PropTypes from 'prop-types';

const SingleItem = props => {

  const { graphic, name, price } = props.selectedItem;
  const item = props.selectedItem;
  const user = props.user;
  const handleBuy = props.handleBuy;

  return (
    <div>
      <img src={graphic} />
      {
        user.gold >= item.price ?
          <a
            onClick={() => handleBuy(user, item)}
            className="btn btn-success">{price}
          </a> :
          <a
            className="btn disabled">{price}
          </a>
      }
      <h3>{name}</h3>
    </div>
  )
}


// SingleItem.propTypes = {
//   selectedItem.name: PropTypes.string.isRequired,
//   selectedItem.graphic: PropTypes.string.isRequired,
//   selectedItem.price: PropTypes.number.isRequired
// };

export default SingleItem;
