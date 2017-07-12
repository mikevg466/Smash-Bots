import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Component //

const Main = (props) => {

  const { children, handleClick, loggedIn, isGamePlaying } = props;

  return (
      <div>
      {isGamePlaying ?
        null :
        <div>
          <nav className="navbar navbar-inverse" role="navigation">
            <div className="container">
              <div className="navbar-header">
                <Link className="navbar-brand" to="home">
                   SMASH-BOTS
                </Link>
                <Link className="navbar-brand" to="lobby">Game Lobbies</Link>
                <Link className="navbar-brand" to="itemStore">Item Store</Link>
                <Link className="navbar-brand" to="character">Inventory</Link>
                <Link className="navbar-brand" to="loginHome">
                Signup/Login</Link>
                <ul className="nav navbar-nav" />
              </div>
            </div>
          </nav>
          {
            props.router.location.pathname === '/itemStore' ?
              null :
              <div className="row">
                <div className="col-md-4" />
                <div className="container-fluid col-md-4 col-sm-12">
                  <img src="ourAssets/smashbot/smashbots_title_page.gif" alt="smashbotsLogo" />
                </div>
                <div className="col-md-4" />
              </div>
          }
        </div>
      }
        <div>
          {props.children}
        </div>
      </div>
  )
}

const mapState = ({ game, user }) => ({
  isGamePlaying: game.isGamePlaying,
  loggedIn: !!user.id
});
const mapDispatch = dispatch => ({
  handleClick () {
    dispatch(logout());
  }
});
export default connect(mapState, mapDispatch)(Main);
