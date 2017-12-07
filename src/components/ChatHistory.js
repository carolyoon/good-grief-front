import React, { Component } from 'react';

class ChatHistory extends Component {
    render() {
      console.log("chat", this.props.messages);
        var items = this.props.messages.map((item,i)=>{
            var info = this.props.service.getUserInfo(item.sender);
            return <li key={i}><b>{info.username}</b> {item.text}</li>
        });
        return <ul>{items}</ul>
    }
}

export default ChatHistory