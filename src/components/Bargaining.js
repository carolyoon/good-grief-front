import React from 'react';
import axios from 'axios';
// import AdvicePost from './AdvicePost';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PubNub from "pubnub";
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";

class Bargaining extends React.Component {
  constructor() {
    super();
    this.state = {
      // advicePosts : [],
      messages: [{ text:"" }],
      currentMessage: "This is my message to you.",
      username:"no-name",
      users:[]
    }
  this.pubnub = new PubNub({
      publishKey: "pub-c-50b2965a-2ab4-407f-b560-217a00a43e81",
      subscribeKey: "sub-c-eb8a716c-d9e3-11e7-9445-0e38ba8011c7",
      presenceTimeout: 30
     })
     //init presence service
    this.service = new PubNubService({
         pubnub:this.pubnub,
         channel:'bargaining-chat'
      });
    //on users update, trigger screen refresh
    this.service.onUserChange((users) => this.setState({ users:users }));
    this.service.onMessage((evt) => {
        this.state.messages.push({
            text:evt.message.text,
            sender:evt.publisher
        });
        this.setState({
            messages: this.state.messages
        })
      });
    this.service.fetchHistory(10,(messages)=>{ this.setState({messages:messages}); });

    this.service.getSelfInfo((info)=>{
        if(info.username) this.setState({username: info.username})
      });
    }

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value })
    }
    sendMessage() {
      this.pubnub.publish({
        channel:"bargaining-chat",
        message: {
            text:this.refs.input.value,
            sender: this.pubnub.getUUID()

        }
    });
      this.setState({ currentMessage:"" })
    }
    changedUsername() {
      this.setState({ username:this.refs.username.value });
    }

    setUsername() {
      this.service.setUserState({username:this.state.username})
    }

    renderUsers() {
      var users = this.state.users.map((user,i)=> {
        return <span key={i}>{user.username}</span>
      });
        return <div className="userlist">{users}</div>
    }


  // componentDidMount() {
  //   axios.get('http://localhost:3001/api/advice_posts')
  //   .then(res => {
  //     const advicePosts = res.data.map ( (post) =>
  //       ({id: post.id, content: post.content}))
  //     this.setState( {advicePosts})
  //   })
  // }

  render() {
    return(
      <div className="bargaining-container">
      <span className="stage-name"><h1>The BARGAINING Stage</h1></span>
        <div className="helpful-apps">
          <h3>Helpful Apps</h3>
            <ul>
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/dontText.png")} />
              <p>Don’t Text That Man!: an app that helps you control your urges to text your ex by providing motivational or wise quotes, as well as measures the time that has passed since you last texted your ex.</p>
              </li><br />
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/drunkBlocker.png")} />
              <p>DrunkDial: a mobile app that stops you from drunk dialing your ex by blocking calls to the numbers you selected in the app.</p>
              </li><br />
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/exLoverBlocker.png")} />
              <p>Ex-Lover Blocker: a mobile app that sends a text message to your closest friends and posts a status update on Facebook when you try to call your ex.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/9-stages-grieving-breakup-no-3-desperate-answers">Desperate for Answers</a></li><br />
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/9-stages-grieving-breakup-no-4-external-bargaining">External Bargaining</a></li><br />
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/9-stages-grieving-breakup-no-5-internal-bargaining">Internal Bargaining</a></li><br />
          </ul>
        </div>
        {/* <div className='advice-posts'>
          <h3>Helpful Advice</h3>
          <ul>
            {this.state.advicePosts.map (key =>
              <AdvicePost id={key.id} content={key.content} />
            )}
          </ul>
        </div> */}
        <Link to="/bargaining_quiz">
           <button type="button">
              Ready to Move on to Depression?
           </button>
        </Link>

        <div className="vbox fill">
          <h1>Bargaining Chat Room</h1>
          <div className="scroll grow">
            <ChatHistory messages={this.state.messages} service={this.service}/>
          </div>
          <div className="hbox">
            <label>username</label>
            <input type="text" ref="username" value={this.state.username}
              onChange={this.changedUsername.bind(this)}
            />
            <button onClick={this.setUsername.bind(this)}>set</button>
          </div>
          <div className="hbox">
            <input className="grow"
              ref="input"
              type="text"
              value={this.state.currentMessage}
              onChange={this.changedMessage.bind(this)}
            />
            <button
              onClick={this.sendMessage.bind(this)}
            >send</button>
          </div>
          <div className="hbox">
            {this.renderUsers()}
          </div>
        </div>

      </div>
    )
  }
}

export default Bargaining;
