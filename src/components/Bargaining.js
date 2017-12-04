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
              <img className="bargaining-image" src={require("../bargaining_images/blockYourEx.png")} />
              <p>Ex-Lover Blocker: a mobile app that sends a text message to your closest friends and posts a status update on Facebook when you try to call your ex.</p>
              </li><br />
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/killSwitch.png")} />
              <p>DrunkDial: a mobile app that administers a sobriety test (timed math problems) before it allows you to phone your ex.</p>
              </li><br />
              <li>
              <img className="bargaining-image" src={require("../bargaining_images/massPasswordReset.png")} />
              <p>Don’t Text That Man!: an app that helps you control your urges to text your ex by providing motivational or wise quotes, as well as measures the time that has passed since you last texted your ex.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="http://www.beliefnet.com/wellness/health/health-support/grief-and-loss/2000/10/anger-griefs-irate-companion.aspx">Anger: Grief's Irate Companion</a></li><br />
            <li><a href="https://www.7cups.com/qa-breakups-21/is-it-normal-to-have-sudden-mood-shifts-of-from-anger-to-grief-to-love-again-and-many-other-shades-of-the-mood-after-a-break-up-especially-after-a-close-dependent-relationship-1247/">Mood Swings and Anger</a></li><br />
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/the-9-stages-grieving-breakup-no-8-anger">All About Anger</a></li><br />
            <li><a href="https://www.harleytherapy.co.uk/counselling/manage-anger-after-breakup.htm">How to Manage Your Anger After a Breakup</a></li><br />
            <li><a href="http://rapidbreakuprecovery.com/how-to-deal-with-anger-after-a-breakup/">Dealing with Your Anger After a Breakup</a></li><br />
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
