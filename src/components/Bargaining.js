import React from 'react';
import axios from 'axios';
import AdvicePost from './AdvicePost';

class Bargaining extends React.Component {
  constructor() {
    super();
    this.state = {
      advicePosts : []
    }
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
      <div className="bargaining-container">
      <span className="stage-name"><h1>The BARGAINING Stage</h1></span>
        <div className="helpful-apps">
          <h3>Helpful Apps</h3>
            <ul>
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/exLoverBlocker.png")} />
              <p>Ex-Lover Blocker: a mobile app that sends a text message to your closest friends and posts a status update on Facebook when you try to call your ex.</p>
              </li><br />
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/drunkBlocker.png")} />
              <p>DrunkDial: a mobile app that stops you from drunk dialing your ex by blocking calls to the numbers you selected in the app.</p>
              </li><br />
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/dontText.png")} />
              <p>Don’t Text That Man!: an app that helps you control your urges to text your ex by providing motivational or wise quotes, as well as measures the time that has passed since you last texted your ex.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/9-stages-grieving-breakup-no-5-internal-bargaining">Internal Bargaining</a></li><br />
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/9-stages-grieving-breakup-no-4-external-bargaining">External Bargaining</a></li><br />
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/9-stages-grieving-breakup-no-3-desperate-answers">Desperate for Answers</a></li><br />
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
          <form>
            <input type="button" value="Ready to Move on?" />
          </form>
        </div>
      </div>

    )
  }

}

export default Bargaining;
