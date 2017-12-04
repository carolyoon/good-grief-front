import React from 'react';
import axios from 'axios';
import AdvicePost from './AdvicePost';

class Depression extends React.Component {
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
      <div className="depression-container">
      <span className="stage-name"><h1>The DEPRESSION Stage</h1></span>
        <div className="helpful-apps">
          <h3>Helpful Apps</h3>
            <ul>
              <li>
              <img className="depression-image" src={require("../depression_images/breakUpMedicine.png")} />
              <p>Breakup Medicine: an app that provides daily exercises, inspirational advice, and action tips for getting over a breakup. </p>
              </li><br />
              <li>
              <img className="depression-image" src={require("../depression_images/dearOldLove.png")} />
              <p>Dear Old Love - a Tumblr blog that allows you to mourn or vent through writing anonymous posts.</p>
              </li><br />
              <li>
              <img className="depression-image" src={require("../depression_images/talkLife.png")} />
              <p>TalkLife - an online therapy app that connects you a licensed therapist wise quotes, as well as measures the time that has passed since you last texted your ex.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="hhttps://consumer.healthday.com/encyclopedia/depression-12/depression-news-176/depression-after-a-breakup-646224.html">Depression After a Breakup</a></li><br />
            <li><a href="https://www.elitedaily.com/dating/become-depressed-after-a-breakup/1958108">How You Can Become Depressed After a Breakup</a></li><br />
            <li><a href="http://www.empowher.com/mental-health/content/how-get-over-depression-after-breakup">How to Get Over Depression After a Breakup</a></li><br />
            <li><a href="https://howloveblossoms.com/post-break-up-overcoming-breakup-depression">How to Overcome Depressed Feelings After a Breakup</a></li><br />
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

export default Depression;
