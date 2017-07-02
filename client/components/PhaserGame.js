import React from 'react';
import { connect } from 'react-redux';
import { runGame } from '../game/phaser-example'

export class PhaserGame extends React.Component{
  constructor(){
    super();
  }

  componentDidMount(){
    const remotePlayerNumList = [];
    Object.keys(this.props.remotePlayers)
      .forEach(playerNum => remotePlayerNumList.push(playerNum));
    const localPlayerNum = this.props.localPlayer ? this.props.localPlayer.number : null;
    console.log('localPlayerNum', localPlayerNum);
    console.log('remotePlayerList', remotePlayerNumList);
    runGame(localPlayerNum, remotePlayerNumList);
  }

  render(){
    return (
      <div id='phaser-example'>
      </div>
    )
  }
}

const mapState = ({ game }) => ({
  localPlayer: game.localPlayer,
  remotePlayers: game.remotePlayers
});

export default connect(mapState)(PhaserGame);
