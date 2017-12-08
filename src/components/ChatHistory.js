import React, { Component } from 'react';

export default class extends Component {
    render() {
        var items = this.props.messages.map((item,i)=>{
            var info = this.props.service.getUserInfo(item.sender);
            return <li key={i}><b>{info.username}</b>{item.text}</li>

        });
        return <ul className='chat-message'>{items}</ul>
    }
}
