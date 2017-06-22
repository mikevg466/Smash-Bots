import React from 'react';

// Component //

export default class Game extends React.Component{
  constructor(){
    super();
    this.state = {
      inputVal: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addChatMessage = this.addChatMessage.bind(this);
  }

  componentDidMount(){
    this.addChatMessage();
  }

  addChatMessage(){
    this.props.player.on('addChatMessage', (msg, playerId, color) => {
      const messageList = this.state.messages.slice(0);
      messageList.push(msg);
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
    e.target.value = '';
    this.props.player.emit('chatMessage', this.state.inputVal);
  }

  render(){
    return (
      <div>
        {
          this.state.messages.map(message => (
            <p key={message}>
              playerID:
              <span>{message}</span>
            </p>
          ))
        }
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.inputVal} onChange={this.handleChange}/>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

