import React from 'react';
import axios from 'axios';
import AdvicePost from './AdvicePost';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PubNub from "pubnub";
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";

class Depression extends React.Component {
  constructor () {
    super()
    this.state = {
      advicePosts : [],
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
         channel:'depression-chat'
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
        channel:"depression-chat",
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

  componentDidMount () {
    axios.get('http://localhost:3001/api/advice_posts')
    .then(res => {
      const advicePosts = res.data.map((post) =>
        ({id: post.id, content: post.content}))
      this.setState({advicePosts})
    })
  }

  render () {
    return (
      <div className='depression-container'>
        <span className='stage-name'><h1>The DEPRESSION Stage</h1></span>
        <div className='helpful-apps'>
          <h3>Helpful Apps</h3>
          <ul>
            <li>
              <img className='depression-image' src={require('../depression_images/breakUpMedicine.png')} />
              <p>Breakup Medicine: an app that provides daily exercises, inspirational advice, and action tips for getting over a breakup. </p>
            </li><br />
            <li>
              <img className='depression-image' src={require('../depression_images/dearOldLove.png')} />
              <p>Dear Old Love - a Tumblr blog that allows you to mourn or vent through writing anonymous posts.</p>
            </li><br />
            <li>
              <img className='depression-image' src={require('../depression_images/talkLife.png')} />
              <p>TalkLife - an online therapy app that connects you a licensed therapist wise quotes, as well as measures the time that has passed since you last texted your ex.</p>
            </li><br />
          </ul>
        </div>
        <div className='helpful-articles'>
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href='hhttps://consumer.healthday.com/encyclopedia/depression-12/depression-news-176/depression-after-a-breakup-646224.html'>Depression After a Breakup</a></li><br />
            <li><a href='https://www.elitedaily.com/dating/become-depressed-after-a-breakup/1958108'>How You Can Become Depressed After a Breakup</a></li><br />
            <li><a href='http://www.empowher.com/mental-health/content/how-get-over-depression-after-breakup'>How to Get Over Depression After a Breakup</a></li><br />
            <li><a href='https://howloveblossoms.com/post-break-up-overcoming-breakup-depression'>How to Overcome Depressed Feelings After a Breakup</a></li><br />
          </ul>
        </div>
        <div className='advice-posts'>
          <h3>Helpful Advice</h3>
          <ul>
            {this.state.advicePosts.map(key =>
              <AdvicePost id={key.id} content={key.content} />
            )}
          </ul>
        </div>
      <Link to="/depression_quiz">
       <button type="button">
          Ready to Move on to Acceptance?
       </button>
      </Link>
    </div>

    )
  }
}

export default Depression
