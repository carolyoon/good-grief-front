import React, { Component } from 'react';

class ChatHistory extends Component {
    render() {
      console.log("chat", this.props.messages);
        var items = this.props.messages.map((item,i)=>{
            var info = this.props.service.getUserInfo(item.sender);
            return <li className='chat' key={i}><b>{this.props.currentUser && this.props.currentUser.username}</b> {item.text}</li>
        });
        return <ul className='chat-message'>{items}</ul>
    }
}

export default ChatHistory