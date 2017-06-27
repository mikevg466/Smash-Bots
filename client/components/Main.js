import React from 'react';

// Component //

const Main = (props) => {
  console.log("main", props)
  return (
    <div>
      {props.children}
    </div>
  )
}

export default Main;
