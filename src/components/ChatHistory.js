import React, { Component } from 'react';

export default class extends Component {
    render() {
        var items = this.props.messages.map((item,i)=>{
            var info = this.props.service.getUserInfo(item.sender);
            console.log(info)
            console.log(item)
            if (info.username) {
              let prevMSG = document.getElementById(`${i-1}`)
              prevMSG.remove()
              return <li id={i} key={i}><b>{info.username}:</b> {item.text}</li>
            } else {
              return <li id={i} key={i}>{item.text}</li>
            }
        });
        return <ul>{items}</ul>
    }
}
