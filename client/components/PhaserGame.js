import React from 'react';
import { connect } from 'react-redux';
import { runGame } from '../game/phaser-example'
import { endGame } from '../redux/game';
import { emitEndGame, onStopGame } from '../sockets/client';

export class PhaserGame extends React.Component{
  constructor(){
    super();
  }

  componentDidMount(){
    runGame();
    onStopGame(this.props.handleEndGame);
  }
  
  // endGame(){
  //   emitEndGame();
  // }

  //need piece that initiates end game

  render(){
    console.log("=====>", this.endGame)
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
  players: game.players
});

const mapDispatch = dispatch => ({
  handleEndGame: () => dispatch(endGame())
})

export default connect(mapState, mapDispatch)(PhaserGame);
