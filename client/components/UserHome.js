import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserHome = props => {
  const { email, username } = props;

  return (
    <div className="container-fluid">
      <h3>Welcome, { username }</h3>
      <h3></h3>
      <h3>Your Equipped Weapon is: {props.weapon.name || 'Thor\'s Hammer'}. (default: Thor's Hammer)</h3>

      <h3></h3>
      <h3>Your currently have {props.gold} gold.</h3>
      <h3></h3>
      <h3></h3>
      <h3>Purchase or equip a weapon before entering a game!</h3>
    </div>
  );
};

const mapState = ({ user }) => ({
  email: user.email,
  username: user.username,
  weapon: user.weapon,
  gold: user.gold
});

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  email: PropTypes.string
};
