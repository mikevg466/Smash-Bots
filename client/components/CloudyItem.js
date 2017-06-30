import React from 'react';
import PropTypes from 'prop-types';

const CloudyItem = props => {

  const { image } = props.selectedItem;

  return (
    <div className="thumbnail text-center">
      <img className="cloudyImage img-responsive" src={image} />
    </div>
  )
}

export default CloudyItem;
