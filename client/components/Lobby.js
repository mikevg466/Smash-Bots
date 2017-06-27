import React from 'react';
import PhaserGame from './PhaserGame';
import {runGame} from '../game/phaser-example'

// Component //

export default class Lobby extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
      messages: [],
      isGamePlaying: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  componentDidMount(){
    this.addChatMessage();
  }

  startGame(){
    this.setState({
      isGamePlaying: true
    });
    runGame();
  }

  addChatMessage(){
    this.props.client.on('addChatMessage', (msg, clientId) => {
      const messageList = this.state.messages.slice(0);
      messageList.push({
        msg,
        clientId
      });
      this.setState({
        messages: messageList
      })
    });
  }

  handleChange(e){
    this.setState({
      inputVal: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({
      inputVal: ''
    })
    this.props.client.emit('chatMessage', this.state.inputVal);
  }

  render(){
    return (
      <div>
      {this.state.isGamePlaying ?
        <PhaserGame /> :
        <div>
          {
            this.state.messages.map(message => (
              <p key={message.msg}>
                {message.clientId}:
                <span>{message.msg}</span>
              </p>
            ))
          }
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.inputVal} onChange={this.handleChange}/>
            <button>Send</button>
          </form>
          <button
            onClick= {this.startGame}
          >Start Game</button>
        </div>
      }
      </div>
    )
  }
}
