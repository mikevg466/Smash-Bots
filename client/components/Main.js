import React from 'react';
import { Link } from 'react-router';

// Component //

const Main = (props) => {
  return (
    <div>
      <nav className="navbar navbar-inverse" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="home">SMASH-BOTS</Link>
            <ul className="nav navbar-nav" />
          </div>
        </div>
      </nav>
      <div className="row">
        <div className="col-md-4" />
        <div className="container-fluid col-md-4 col-sm-12">
          <img src="ourAssets/smashbot/smashbots_title_page.gif" alt="smashbotsLogo" />
        </div>
        <div className="col-md-4" />
      </div>
      <div>
        {props.children}
      </div>
    </div>
  )
}

export default Main;
