import React from 'react';
// import AdvicePost from './AdvicePost';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import PubNub from "pubnub";
import ReactHover from 'react-hover';

import AdvicePost from './AdvicePost';
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";
import { base } from '../fire';
import fire from '../fire';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0
}


class Denial extends React.Component {
  constructor () {
    super()
    this.state = {
      // advicePosts : [],
      messages: [{ text:"" }],
      currentMessage: "This is my message to you.",
      username: "",
      users:[]
    };

    // this.toggleAdvicePostFormState = this.toggleAdvicePostFormState.bind(this)
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
        this.setState({username: this.props.currentUser && this.props.currentUser.username})
      });
    }

  componentWillMount(){
    const messages = []
    let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      messages.push(message)
      this.setState({messages});
    })
  }

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value })
    }

    sendMessage() {
    this.setState({ currentMessage:"" })

    fire.database().ref('messages').push( this.refs.input.value );
    this.refs.input.value = '';
    }

    setUsername() {
      this.service.setUserState({username: this.props.currentUser && this.props.currentUser.username})
    }

    renderUsers() {
      var users = this.state.users.map((user,i)=> {
        return <span key={i}>{this.props.currentUser && this.props.currentUser.username}</span>
      });
        return <div className="userlist">{users}</div>
    }



  // toggleAdvicePostFormState () {
  //   this.setState(prevState => ({
  //     advicePosts: !prevState.displayNewAdvicePostForm
  //   }))
  // }

  // componentDidMount () {
  //   axios.get('http://localhost:3001/api/advice_posts')
  //   .then(res => {
  //     const advicePosts = res.data.map((post) =>
  //       ({id: post.id, content: post.content}))
  //     this.setState({advicePosts})
  //   })
  // }

  render () {
    return (
      <div className='denial-container'>
        <span className='stage-name'>
          <h1>The DENIAL Stage</h1>
        </span>

        <h3 className='subheader'>Helpful Apps</h3>
        <div>
          <ul className='helpful-apps'>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className='denial-image' width='250' height='115' src={require('../denial_images/blockYourEx.png')} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Block Your Ex</p> A Chrome and Firefox-based plugin that allows you to remove an ex’s Twitter, Facebook and blog from your view in one go.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className='denial-image' width='250' height='100' src={require('../denial_images/killSwitch.png')} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Killswitch</p> A mobile app that removes all traces of your ex from your Facebook by deleting pictures, videos, posts and status updates that tagged both of you</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className='denial-image' width='250' height='100' src={require('../denial_images/massPasswordReset.png')} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Mass Password Reset</p> A Firefox extension that allows you to change the password for numerous shared accounts at once.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
          </ul>
        </div>

        <hr />

        <h3 className='subheader'>Helpful Articles</h3>
        <div className='helpful-articles'>
          <ol className='ordered-list'>
            <li className='links'><span className='number'>1.</span><a href='https://www.psychologytoday.com/blog/me-we/201501/the-9-stages-grieving-breakup-no-2-denial' target='blank'>All About Denial</a></li>
            <li className='links'><span className='number'>2.</span><a href='https://pairedlife.com/breakups/Feelings-of-Denial-When-a-Relationship-Ends' target='blank'>Feelings of Denial When a Relationship Ends</a></li>
            <li className='links'><span className='number'>3.</span><a href='https://datingtips.match.com/over-denial-breakup-42642.html' target='blank'>How to Get Over Denial About a Breakup</a></li>
          </ol>
        </div>

        {/* <div className='advice-posts'>
          <h3>Helpful Advice</h3>
          <ul>
            {this.state.advicePosts.map(key =>
              <AdvicePost id={key.id} content={key.content} />
            )}
          </ul>
        </div> */}

        <Link to="/denial_quiz">
         <button type="button">
            Ready to Move on to Anger?
         </button>
        </Link>

        <div className="vbox fill">
          <h1>Denial Chat Room</h1>
          <div className="scroll grow">
            <ChatHistory messages={this.state.messages} service={this.service} currentUser={this.props.currentUser}/>
          </div>
          <div className="hbox">
            <label>{this.props.currentUser && this.props.currentUser.username}</label>

          </div>
          <div className="hbox">
            <input className="grow"
              ref="input"
              type="text"
              value={this.state.currentMessage}
              onChange={this.changedMessage.bind(this)}
            />

            <button
              onClick={this.sendMessage.bind(this)}>send
            </button>
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
