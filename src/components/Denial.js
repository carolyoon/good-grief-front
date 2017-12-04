import React from 'react';
import AdvicePost from './AdvicePost';
import img from '../denial_images/blockYourEx.png';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

class Denial extends React.Component {
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
      <div className="denial-container">
      <span className="stage-name"><h1>The DENIAL Stage</h1></span>
        <div className="helpful-apps">
          <h3>Helpful Apps</h3>
            <ul>
              <li>
              <img className="denial-image" src={require("../denial_images/blockYourEx.png")} />
              <p>Block Your Ex: a Chrome and Firefox-based plugin that allows you to remove an ex’s Twitter, Facebook and blog from your view in one go.</p>
              </li><br />
              <li>
              <img className="denial-image" src={require("../denial_images/killSwitch.png")} />
              <p>Killswitch: a mobile app that removes all traces of your ex from your Facebook by deleting pictures, videos, posts and status updates that tagged both of you</p>
              </li><br />
              <li>
              <img className="denial-image" src={require("../denial_images/massPasswordReset.png")} />
              <p>Mass Password Reset: a Firefox extension that allows you to change the password for numerous shared accounts at once.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/the-9-stages-grieving-breakup-no-2-denial">All About Denial</a></li><br />
            <li><a href="https://pairedlife.com/breakups/Feelings-of-Denial-When-a-Relationship-Ends">Feelings of Denial When a Relationship Ends</a></li><br />
            <li><a href="https://datingtips.match.com/over-denial-breakup-42642.html">How to Get Over Denial About a Breakup</a></li><br />
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
        <Link to="/anger_quiz">
         <button type="button">
            Ready to Move on?
         </button>
        </Link>
      </div>
    )
  }
}

export default Denial;
