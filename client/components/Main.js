import React from 'react';

// Component //

const Main = (props) => {
  console.log('hi', props.children)
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Main;
