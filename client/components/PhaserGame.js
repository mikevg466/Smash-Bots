import React from 'react';
import { connect } from 'react-redux';
import { runGame } from '../game/phaser-example';
import { onPlayerStateUpdates, emitEndGame, onStopGame } from '../sockets/client';
import { processPlayerUpdate, endGame, setActivePlayers } from '../redux/game';

export class PhaserGame extends React.Component{
  constructor(){
    super();
    this.onPlayerStateUpdates = this.onPlayerStateUpdates.bind(this);
  }

  componentDidMount(){
    onPlayerStateUpdates(this.onPlayerStateUpdates);
    const remotePlayerNumList = [];
    Object.keys(this.props.remotePlayers)
      .forEach(playerNum => remotePlayerNumList.push(playerNum));
    const localPlayerNum = this.props.localPlayer ? this.props.localPlayer.number : null;
    runGame(localPlayerNum, remotePlayerNumList);
    onStopGame(this.props.handleEndGame);

  }

  onPlayerStateUpdates(players){
    this.props.handleSetActivePlayers(
      Object.keys(players)
        .filter(player => players[player].lives)
        .length
    );
    this.props.handlePlayerStateUpdates(players);
  }

  endGame(){
    emitEndGame();
  }

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
  remotePlayers: game.remotePlayers,
  winner: game.winner,
});

const mapDispatch = dispatch => ({
  handlePlayerStateUpdates: state => dispatch(processPlayerUpdate(state)),
  handleEndGame: () => dispatch(endGame()),
  handleSetActivePlayers: (numPlayers) => dispatch(setActivePlayers(numPlayers)),
})

export default connect(mapState, mapDispatch)(PhaserGame);
