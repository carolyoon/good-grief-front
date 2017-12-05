import React from 'react';
import axios from 'axios';
import AdvicePost from './AdvicePost';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

class Anger extends React.Component {
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
        ({id: post.id, content: post.content, stageId: post.stageId}))
      this.setState( {advicePosts})
    })
  }

  render() {
    return(
      <div className="anger-container">
      <span className="stage-name"><h1>The ANGER Stage</h1></span>
        <div className="helpful-apps">
          <h3>Helpful Apps</h3>
            <ul>
              <li>
              <img className="anger-image" src={require("../anger_images/headSpace.png")} />
              <p>Headspace: a meditation app that guides you through mindfulness exercises to help reduce stress and anger.</p>
              </li><br />
              <li>
              <img className="anger-image" src={require("../anger_images/neverLiked.png")} />
              <p>NeverLikedItAnyway.com: an eBay type website where you can sell the stuff that lingers after a breakup, and buy things from other people doing the same thing.</p>
              </li><br />
              <li>
              <img className="anger-image" src={require("../anger_images/outOfYourLife.png")} />
              <p>Out of your Life: an app that buys your jewelry related to your ex, such as diamond rings and wedding bands.</p>
              </li><br />
              <li>
              <img className="anger-image" src={require("../anger_images/pictureBurn.png")} />
              <p>Picture Burn- an app that allows you digitally reproduce the cathartic act of burning photos of your ex.</p>
              </li><br />
            </ul>
        </div>
        <div className="helpful-articles">
          <h3>Helpful Articles</h3>
          <ul>
            <li><a href="https://www.psychologytoday.com/blog/me-we/201501/the-9-stages-grieving-breakup-no-8-anger">All About Anger</a></li><br />
            <li><a href="http://www.beliefnet.com/wellness/health/health-support/grief-and-loss/2000/10/anger-griefs-irate-companion.aspx">Anger: Grief's Irate Companion</a></li><br />
            <li><a href="http://rapidbreakuprecovery.com/how-to-deal-with-anger-after-a-breakup/">Dealing with Your Anger After a Breakup</a></li><br />
            <li><a href="https://www.harleytherapy.co.uk/counselling/manage-anger-after-breakup.htm">How to Manage Your Anger After a Breakup</a></li><br />
            <li><a href="https://www.7cups.com/qa-breakups-21/is-it-normal-to-have-sudden-mood-shifts-of-from-anger-to-grief-to-love-again-and-many-other-shades-of-the-mood-after-a-break-up-especially-after-a-close-dependent-relationship-1247/">Mood Swings and Anger</a></li><br />
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

        <Link to="/bargaining_quiz">
           <button type="button">
              Ready to Move on to Bargaining?
           </button>
        </Link>
      </div>
    )
  }
}

export default Anger;
