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

class Anger extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [{ text:"" }],
      currentMessage: "This is my message to you.",
      username:"no-name",
      // advicePosts : [],
      angerMessages: [{ text:"" }],
      currentMessage: "This is my message to you.",
      username:"",
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
         channel:'anger-chat'
      });
    //on users update, trigger screen refresh
    this.service.onUserChange((users) => this.setState({ users:users }));
    this.service.onMessage((evt) => {
        this.state.angerMessages.push({
            text:evt.message.text,
            sender:evt.publisher
        });
        this.setState({
            angerMessages: this.state.angerMessages
        })
      });
    this.service.fetchHistory(10,(messages)=>{ this.setState({angerMessages: messages}); });

    this.service.getSelfInfo((info)=>{
        this.setState({username: this.props.currentUser && this.props.currentUser.username})
      });
    }

  componentWillMount(){
    const messages = []
    let messagesRef = fire.database().ref('angerMessages').orderByKey().limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      messages.push(message)
      this.setState({angerMessages: messages});
    })
  }

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value })
    }
  sendMessage() {
    this.setState({ currentMessage:"" })

    fire.database().ref('angerMessages').push( this.refs.input.value );
    this.refs.input.value = '';
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
A
  // componentDidMount() {
  //   axios.get('http://localhost:3001/api/advice_posts')
  //   .then(res => {
  //     const advicePosts = res.data.map ( (post) =>
  //       ({id: post.id, content: post.content, stageId: post.stageId}))
  //     this.setState( {advicePosts})
  //   })
  // }

  render() {
    return(
      <div className='stage-container'>
        <span className='stage-name'>
          <h1>The ANGER Stage</h1>
        </span>

        <h3 className='subheader'>Helpful Apps</h3>
        <div>
          <ul className='helpful-apps'>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="anger-image" src={require("../anger_images/headSpace.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'>
                    <p className='app-name'>Headspace</p> A meditation app that guides you through mindfulness exercises to help reduce stress and anger.
                  </p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="anger-image" src={require("../anger_images/neverLiked.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'>
                    <p className='app-name'> NeverLikedItAnyway</p> An eBay type website where you can sell the stuff that lingers after a breakup and buy things from other people doing the same thing.
                  </p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="anger-image" src={require("../anger_images/outOfYourLife.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'>
                    <p className='app-name'>Out of your Life</p> An app that buys your jewelry related to your ex, such as diamond rings and wedding bands.
                  </p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
            <li>
              <ReactHover
                options={optionsCursorTrueWithMargin}>
                <ReactHover.Trigger type='trigger'>
                  <img className="anger-image" src={require("../anger_images/pictureBurn.png")} />
                </ReactHover.Trigger>
                <ReactHover.Hover type='hover'>
                  <p className='app-details'>
                    <p className='app-name'>Picture Burn</p> An app that allows you digitally reproduce the cathartic act of burning photos of your ex.
                  </p>
                </ReactHover.Hover>
              </ReactHover>
            </li>
          </ul>
        </div>

        <hr />

        <h3 className='subheader'>Helpful Articles</h3>
        <div className="helpful-articles">
          <ol className='ordered-list'>
            <li className='links'><span className='number'>1.</span><a href="https://www.psychologytoday.com/blog/me-we/201501/the-9-stages-grieving-breakup-no-8-anger" target='blank'>All About Anger</a></li>
            <li className='links'><span className='number'>2.</span><a href="http://www.beliefnet.com/wellness/health/health-support/grief-and-loss/2000/10/anger-griefs-irate-companion.aspx" target='blank'>Anger: Grief's Irate Companion</a></li>
            <li className='links'><span className='number'>3.</span><a href="http://rapidbreakuprecovery.com/how-to-deal-with-anger-after-a-breakup/" target='blank'>Dealing with Your Anger After a Breakup</a></li>
            <li className='links'><span className='number'>4.</span><a href="https://www.harleytherapy.co.uk/counselling/manage-anger-after-breakup.htm" target='blank'>How to Manage Your Anger After a Breakup</a></li>
            <li className='links'><span className='number'>5.</span><a href="https://www.7cups.com/qa-breakups-21/is-it-normal-to-have-sudden-mood-shifts-of-from-anger-to-grief-to-love-again-and-many-other-shades-of-the-mood-after-a-break-up-especially-after-a-close-dependent-relationship-1247/" target='blank'>Mood Swings and Anger</a></li>
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

        <p className='move-on-sentence'> Ready to Move on to Bargaining? Take the
        <Link className='quiz-link' to="/anger_quiz"> ANGER QUIZ </Link>
        to see if you are ready.
        </p>

        <hr />

        <h3 className='subheader'>Anger Chat Room</h3>
        <div className="vbox fill">
          <div className="scroll grow">
            <ChatHistory messages={this.state.angerMessages} service={this.service} currentUser={this.props.currentUser}/>
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

export default Anger;
