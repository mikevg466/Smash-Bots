import React from 'react';
import { connect } from 'react-redux';
import { runGame } from '../game/phaser-example';
import { onPlayerStateUpdates } from '../sockets/client';
import { processPlayerUpdate } from '../redux/game';

export class PhaserGame extends React.Component{
  constructor(){
    super();
  }

  componentDidMount(){
    onPlayerStateUpdates(this.props.handlePlayerStateUpdates);
    const remotePlayerNumList = [];
    Object.keys(this.props.remotePlayers)
      .forEach(playerNum => remotePlayerNumList.push(playerNum));
    const localPlayerNum = this.props.localPlayer ? this.props.localPlayer.number : null;
    runGame(localPlayerNum, remotePlayerNumList);
  }

  render(){
    return (
      <div id='phaser-example'>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  handlePlayerStateUpdates: state => dispatch(processPlayerUpdate(state))
});

const mapState = ({ game }) => ({
  localPlayer: game.localPlayer,
  remotePlayers: game.remotePlayers
});

export default connect(mapState, mapDispatch)(PhaserGame);
