
import React from 'react';
import AdvicePost from './AdvicePost';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import PubNub from "pubnub";
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";
import { base } from '../fire';



class Denial extends React.Component {
  constructor () {
    super()
    this.state = {
      advicePosts : [],
      messages: [{ text:"" }],
      currentMessage: "This is my message to you.",
      username:"no-name",
      users:[]
    };

    this.toggleAdvicePostFormState = this.toggleAdvicePostFormState.bind(this)
    this.pubnub = new PubNub({
      publishKey: "pub-c-50b2965a-2ab4-407f-b560-217a00a43e81",
      subscribeKey: "sub-c-eb8a716c-d9e3-11e7-9445-0e38ba8011c7",
      presenceTimeout: 30
     })
     //init presence service
    this.service = new PubNubService({
         pubnub:this.pubnub,
         channel:'denial-chat'
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

  //    componentWillMount(){
  //   let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
  //   messagesRef.on('child_added', snapshot => {
  //     let message = { text: snapshot.val(), id: snapshot.key };
  //     this.setState({ messages: [message].concat(this.state.messages) });
  //   })
  // }
  //   componentWillMount() {
  //     this.ref = base.syncState('/denial', {
  //       context: this,
  //       state: 'messages'
  //   });
  //   }

  //   componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  //

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value })
    }
    sendMessage() {
      this.pubnub.publish({
        channel:"denial-chat",
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



  toggleAdvicePostFormState () {
    this.setState(prevState => ({
      advicePosts: !prevState.displayNewAdvicePostForm
    }))
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
      <div className='denial-container'>
        <span className='stage-name'><h1>The DENIAL Stage</h1></span>
        <div className='helpful-apps'>
          <h3>Helpful Apps</h3>
          <ul>
            <li>
              <img className='denial-image' src={require('../denial_images/blockYourEx.png')} />
              <p>Block Your Ex: a Chrome and Firefox-based plugin that allows you to remove an ex’s Twitter, Facebook and blog from your view in one go.</p>
            </li><br />
            <li>
              <img className='denial-image' src={require('../denial_images/killSwitch.png')} />
              <p>Killswitch: a mobile app that removes all traces of your ex from your Facebook by deleting pictures, videos, posts and status updates that tagged both of you</p>
            </li><br />
            <li>
              <img className='denial-image' src={require('../denial_images/massPasswordReset.png')} />
              <p>Mass Password Reset: a Firefox extension that allows you to change the password for numerous shared accounts at once.</p>
            </li><br />
          </ul>
        </div>
        <div className='helpful-articles'>
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href='https://www.psychologytoday.com/blog/me-we/201501/the-9-stages-grieving-breakup-no-2-denial'>All About Denial</a></li><br />
            <li><a href='https://pairedlife.com/breakups/Feelings-of-Denial-When-a-Relationship-Ends'>Feelings of Denial When a Relationship Ends</a></li><br />
            <li><a href='https://datingtips.match.com/over-denial-breakup-42642.html'>How to Get Over Denial About a Breakup</a></li><br />
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
        <Link to='/anger_quiz'>
          <button type='button'>
            Ready to Move on to Anger?
         </button>
        </Link>

        <div className="vbox fill">
          <h1>Denial Chat Room</h1>
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

export default Denial
