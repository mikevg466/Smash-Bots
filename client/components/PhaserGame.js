import React from 'react';
import { connect } from 'react-redux';
import { runGame } from '../game/phaser-example';
import { onPlayerStateUpdates, emitEndGame, onStopGame } from '../sockets/client';
import { processPlayerUpdate, endGame } from '../redux/game';

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
    onStopGame(this.props.handleEndGame);

  }
  
  // endGame(){
  //   emitEndGame();
  // }

  //need piece that initiates end game

  render(){
    return (
      <div>
        <div id='phaser-example'>
        </div>
        <button
            onClick= {this.endGame}
          >End Game</button>
      </div>
      
    )
  }
}

const mapState = ({ game }) => ({
  localPlayer: game.localPlayer,
  remotePlayers: game.remotePlayers
});

const mapDispatch = dispatch => ({
  handlePlayerStateUpdates: state => dispatch(processPlayerUpdate(state)),
  handleEndGame: () => dispatch(endGame())
})

export default connect(mapState, mapDispatch)(PhaserGame);
