import React from 'react';
import PropTypes from 'prop-types';

const CloudyItem = props => {

  const { graphic } = props.selectedItem;

  return (
    <div className="thumbnail text-center">
      <img className="cloudyImage img-responsive" src={graphic} />
    </div>
  )
}

export default CloudyItem;
