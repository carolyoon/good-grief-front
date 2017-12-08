import React from 'react';
import axios from 'axios';
// import AdvicePost from './AdvicePost';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import PubNub from "pubnub";
import ReactHover from 'react-hover';

import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";
import fire from '../fire';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: -90,
  shiftY: -10
}

class Depression extends React.Component {
  constructor () {
    super()
    this.state = {
     // advicePosts : [],
     depressionMessages: [{ text:"" }],
     currentMessage: "",
     username:"",
     users:[]
    }

    this.pubnub = new PubNub({
      publishKey: 'pub-c-50b2965a-2ab4-407f-b560-217a00a43e81',
      subscribeKey: 'sub-c-eb8a716c-d9e3-11e7-9445-0e38ba8011c7',
      presenceTimeout: 30
    })
     //  init presence service
    this.service = new PubNubService({
      pubnub: this.pubnub,
      channel: 'depression-chat'
    })
      //  on users update, trigger screen refresh
    this.service.onUserChange((users) => this.setState({ users: users }))
    this.service.onMessage((evt) => {
      this.state.depressionMessages.push({
        text: evt.message.text,
        sender: evt.publisher
      })
      this.setState({
        depressionMessages: this.state.depressionMessages
      })
    })
    this.service.fetchHistory(10, (messages) => { this.setState({depressionMessages: messages}) })

    this.service.getSelfInfo((info) => {
      if (info.username) this.setState({username: info.username})
    })
  }

  componentWillMount(){
    if (this.state.depressionMessages.length <= 1) {
      const messages = []
      let messagesRef = fire.database().ref('depressionMessages').orderByKey().limitToLast(100);

      messagesRef.on('child_added', snapshot => {
        let message = { text: snapshot.val(), id: snapshot.key };
        messages.push(message)
        this.setState({depressionMessages: messages});
      })
    }
  }

 changedMessage() {
    this.setState({ currentMessage:this.refs.input.value })
  }

  sendMessage() {
    fire.database().ref('depressionMessages').push( this.refs.input.value );
    this.pubnub.publish({
      channel: 'depression-chat',
      message: {
        // text: this.refs.input.value,
        sender: this.pubnub.getUUID()

      }
    })
    this.setState({ currentMessage:"" })

    this.refs.input.value = '';
    }

  changedUsername () {
    this.setState({ username: this.refs.username.value })
  }

  setUsername () {
    this.service.setUserState({username: this.state.username})
  }

  renderUsers () {
    var users = this.state.users.map((user, i) => {
      return <span key={i}>{user.username}</span>
    })
    return <div className='user-list'>{users}</div>
  }

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
      <div className='stage-container'>
        <span className='stage-name'>
          <h1>The DEPRESSION Stage</h1>
        </span>

        <h3 className='subheader'>Helpful Apps</h3>
        <div>
          <ul className='helpful-apps'>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className='depression-image' src={require('../depression_images/breakUpMedicine.png')} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Breakup Medicine</p> An app that provides daily exercises, inspirational advice, and action tips for getting over a breakup.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className='depression-image' width='140' height='140' src={require('../depression_images/talkLife.png')} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>TalkLife</p> An online therapy app that connects you a licensed therapist wise quotes, as well as measures the time that has passed since you last texted your ex.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className='depression-image' src={require('../depression_images/dearOldLove.png')} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Dear Old Love</p> A Tumblr blog that allows you to mourn or vent through writing anonymous posts.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
          </ul>
        </div>

        <hr />

        <h3 className='subheader'>Helpful Articles</h3>
        <div className='helpful-articles'>
          <ol className='ordered-list'>
            <li className='links'><span className='number'>1.</span><a href='hhttps://consumer.healthday.com/encyclopedia/depression-12/depression-news-176/depression-after-a-breakup-646224.html' target='blank'>Depression After a Breakup</a></li>
            <li className='links'><span className='number'>2.</span><a href='https://www.elitedaily.com/dating/become-depressed-after-a-breakup/1958108' target='blank'>How You Can Become Depressed After a Breakup</a></li>
            <li className='links'><span className='number'>3.</span><a href='http://www.empowher.com/mental-health/content/how-get-over-depression-after-breakup' target='blank'>How to Get Over Depression After a Breakup</a></li>
            <li className='links'><span className='number'>4.</span><a href='https://howloveblossoms.com/post-break-up-overcoming-breakup-depression' target='blank'>How to Overcome Depressed Feelings After a Breakup</a></li>
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

      <p className='move-on-sentence'> Ready to Move on to Acceptance? Take the
      <Link className='quiz-link' to="/depression_quiz"> DEPRESSION QUIZ </Link>
      to see if you are ready.
      </p>

      <hr />

      <h3 className='subheader'>Depression Chat Room</h3>
      <div className="vbox fill">

        <div className='scroll grow'>
            <ChatHistory messages={this.state.depressionMessages} service={this.service} />
          </div>
          <div className='hbox'>
            <input className='username-field' placeholder='enter username' type='text' ref='username' value={this.state.username}
              onChange={this.changedUsername.bind(this)}
                    />
            <button className='set-button' onClick={this.setUsername.bind(this)}>set</button>
          </div>
          <div className='hbox'>
            <input className='grow'
              ref='input'
              type='text'
              value={this.state.currentMessage}
              onChange={this.changedMessage.bind(this)}
                    />
            <button
              className='send-button'
              onClick={this.sendMessage.bind(this)}
                    >send</button>
          </div>
          <div className='hbox'>
            {this.renderUsers()}
          </div>
      </div>
      </div>
    )
  }
}

export default Depression
