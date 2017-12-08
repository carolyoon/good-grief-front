import React from 'react';
// import AdvicePost from './AdvicePost';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import PubNub from "pubnub";
import ReactHover from 'react-hover';

import img from '../acceptance_images/bumble.png';
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";
import fire from '../fire';

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: -90,
  shiftY: -10
}

class Acceptance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // advicePosts : [],
     acceptanceMessages: [{ text:"" }],
      currentMessage: "This is my message to you.",
      username:"",
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
         channel:'acceptance-chat'
      });
    //on users update, trigger screen refresh
    this.service.onUserChange((users) => this.setState({ users:users }));
    this.service.onMessage((evt) => {
        this.state.acceptanceMessages.push({
            text:evt.message.text,
            sender:evt.publisher
        });
        this.setState({
            acceptanceMessages: this.state.messages
        })
      });
    this.service.fetchHistory(10,(messages)=>{ this.setState({acceptanceMessages:messages}); });

    this.service.getSelfInfo((info)=>{
        this.setState({username: this.props.currentUser && this.props.currentUser.username})
      });
    }

  componentWillMount(){
    const messages = []
    let messagesRef = fire.database().ref('acceptanceMessages').orderByKey().limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      messages.push(message)
      this.setState({acceptanceMessages: messages});
    })
  }

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value })
    }

  sendMessage() {
    this.setState({ currentMessage:"" })

    fire.database().ref('acceptanceMessages').push( this.refs.input.value );
    this.refs.input.value = '';
    }

    changedUsername() {
      this.setState({ username:this.refs.username.value });
    }

    setUsername() {
      this.service.setUserState({username:this.props.currentUser && this.props.currentUser.username})
    }

    renderUsers() {
      var users = this.state.users.map((user,i)=> {
        return <span key={i}>{this.props.currentUser && this.props.currentUser.username}</span>
      });
        return <div className="userlist">{users}</div>
    }

  // toggleAdvicePostFormState() {
  //   this.setState(prevState => ({
  //     advicePosts: !prevState.displayNewAdvicePostForm
  //   }));
  // }

  componentDidMount() {
    axios.get('http://localhost:3001/api/advice_posts')
    .then(res => {
      const advicePosts = res.data.map ( (post) =>
        ({id: post.id, content: post.content}))
      this.setState( {advicePosts})
    })
  }

  render() {
    return(
      <div className="stage-container">
        <span className="stage-name">
          <h1>The ACCEPTANCE Stage</h1>
        </span>

        <h3 className='subheader'>Helpful Apps</h3>
        <div>
          <ul className="helpful-apps">
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="acceptance-image" src={require("../acceptance_images/bumble.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Bumble</p> A mobile app that allows you to connect with other singles in your area.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="acceptance-image" src={require("../acceptance_images/futureMe.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>FutureMe</p> A web app that allows you to write advice to yourself, which will be emailed to you in the future.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="acceptance-image" src={require("../acceptance_images/kayak.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Kayak</p> A travel app that makes it easy for you to plan and book your next vacation.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="acceptance-image" src={require("../acceptance_images/meetup.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'><p className='app-name'>Meetup</p> An app that connects you to clubs and groups in your area based on your similarities and interests to help you stay occupied as you interact with new people.</p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
          </ul>
        </div>

        <hr />

        <h3 className='subheader'>Helpful Articles</h3>
        <div className="helpful-articles">
          <ol className='ordered-list'>
            <li className='links'><span className='number'>1.</span><a href="https://www.zoosk.com/date-mix/dating-advice/dating-advice-women/dating-tips-for-women/" target='blank'>The 15 Most Important Dating Tips</a></li>
            <li className='links'><span className='number'>2.</span><a href="http://www.yourtango.com/2012154626/10-dating-tips-i-wish-i-d-followed-while-i-was-single" target='blank'>10 Dating Tips I REALLY Wish I Followed When I Was Single</a></li>
            <li className='links'><span className='number'>3.</span><a href="https://www.huffingtonpost.com/julie-chen-md/grieving-process_b_3596307.html" target='blank'>Accepting and Embracing Grief:A Road to Healing</a></li>
          </ol>
        </div>

        {/* <div className='advice-posts'>
          <h3>Helpful Advice</h3>
          <ul>
            {this.state.advicePosts.map (key =>
              <AdvicePost id={key.id} content={key.content} />
            )}
          </ul>
        </div> */}

        <p className='move-on-sentence'> Ready to Move on? Take the
        <Link className='quiz-link' to="/acceptance_quiz"> ACCEPTANCE QUIZ </Link>
        to see if you are ready.
        </p>

        <hr />

        <h3 className='subheader'>Acceptance Chat Room</h3>
        <div className="vbox fill">
          <div className="scroll grow">
            <ChatHistory messages={this.state.acceptanceMessages} service={this.service}
            currentUser={this.props.currentUser}/>
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

export default Acceptance;
