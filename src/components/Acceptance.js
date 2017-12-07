import React from 'react';
import AdvicePost from './AdvicePost';
import img from '../acceptance_images/bumble.png';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';


class Acceptance extends React.Component {
  constructor() {
    super();
    this.state = {
      advicePosts : []
    };

    this.toggleAdvicePostFormState = this.toggleAdvicePostFormState.bind(this)
  }

  toggleAdvicePostFormState() {
    this.setState(prevState => ({
      advicePosts: !prevState.displayNewAdvicePostForm
    }));
  }

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
      <div className="acceptance-container">
      <span className="stage-name"><h1>The ACCEPTANCE Stage</h1></span>
        <div className="helpful-apps">
          <h3>Helpful Apps</h3>
            <ul>
              <li>
              <img className="acceptance-image" src={require("../acceptance_images/bumble.png")} />
              <p>Bumble: A mobile app that allows you to connect with other singles in near you.</p>
              </li><br />
              <li>
              <img className="acceptance-image" src={require("../acceptance_images/futureMe.png")} />
              <p>FutureMe.org: A web app that allows you to write advice to yourself and emailed to you in the future.</p>
              </li><br />
              <li>
              <img className="acceptance-image" src={require("../acceptance_images/kayak.png")} />
              <p>Kayak: A travel app that makes it easy for you to plan and book your next travel destination.</p>
              </li><br />
               <li>
              <img className="acceptance-image" src={require("../acceptance_images/meetup.png")} />
              <p>Meetup: An app that connects you to clubs/groups in your area based off your interests to stay busy and interact with new people.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="https://www.zoosk.com/date-mix/dating-advice/dating-advice-women/dating-tips-for-women/">The 15 Most Important Dating Tips</a></li><br />
            <li><a href="http://www.yourtango.com/2012154626/10-dating-tips-i-wish-i-d-followed-while-i-was-single">10 Dating Tips I REALLY Wish I Followed When I Was Single</a></li><br />
            <li><a href="https://www.huffingtonpost.com/julie-chen-md/grieving-process_b_3596307.html">Accepting and Embracing Grief:A Road to Healing</a></li><br />
          </ul>
        </div>
        <div className='advice-posts'>
          <h3>Helpful Advice</h3>
          <ul>
            {this.state.advicePosts.map (key =>
              <AdvicePost id={key.id} content={key.content} />
            )}
          </ul>
        </div>
        <div className='move-on-button'>
          <Link to="/acceptance_quiz">
           <button type="button">
              Ready to Move on?
           </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Acceptance;
