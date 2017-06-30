import React from 'react';
import { connect } from 'react-redux';
import { runGame } from '../game/phaser-example'

export class PhaserGame extends React.Component{
  constructor(){
    super();
  }

  componentDidMount(){
    runGame();
  }

  render(){
    return (
      <div id='phaser-example'>
      </div>
    )
  }
}

const mapState = ({ game }) => ({
  players: game.players
});

export default connect(mapState)(PhaserGame);
