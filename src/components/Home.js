import React from 'react';

import * as FontAwesome from 'react-icons/lib/fa';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <div className="mission-statement">
          <h1 className='mission-statement-header'>Mission Statement:</h1>
          <p className='mission-statement-body'>We strive to create a safe environment for those with a broken heart from a relationship dissolution and want to begin the healing process. As such, we aim to provide resources, concerned with the five common stages of grief, to those who want to know how others have overcome the grieving process.</p>
        </div>

        <div className='understanding-grief-container'>
          <div className='stages-of-grief-image'>
            <img height='450' src={require('../5-stages-of-grief.png')} />
          </div>

          <div>
            <div className='understanding-grief-title'>
              <span className='understanding'>Understanding</span>
              <p className='the-stages-of-grief'>the Five Stages of Grief</p>
            </div>

            <div className='understanding-grief-body'>
              <dl>
                <dt>𝟙 Denial</dt>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Protects you from overwhelming emotions</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> May feel like a numbness or isolation from reality</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Should not be confused with a lack of caring</dd>

                <dt>𝟚 Anger</dt>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Anger may be directed at the people or situations associated with the break-up</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> May feel like it is a great idea to tell anyone and everyone what a psycho-crazy vixen your ex was </dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Take your time in this stage and understand your options</dd>

                <dt>𝟛 Bargaining</dt>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Can occur before or after the break-up</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Involves thinking about possibilities to make the relationship work through negotiations, threats, and/or magic </dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Unresolved issues in this stage can lead to intense remorse or guilt</dd>

                <dt>𝟜 Depression</dt>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> You may experience deep grief and sadness beyond what you imagined</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> This stage can feel like it will last forever or like there is no point in going on</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> This stage is natural and not something that you should "snap out of"</dd>

                <dt>𝟝 Acceptance</dt>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Acceptance entails making peace with the loss, letting go of the relationship, and slowly moving forward with your life</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Does not mean that you are all right with the reality, just that you have accepted it</dd>
                <dd className='grief-explanation'><span className='heart-bullet'>❧</span> Happens a little bit at a time, as grief is a long process</dd>
              </dl>
            </div>
          </div>
        </div>

        <hr />

        <div className="disclaimer-container">
          <h4 className='disclaimer-header'>Disclaimer:</h4>
          <p className='disclaimer-body'>Good Grief DOES NOT provide medical advice.
            The information on this site is not intended or implied to be a substitute for professional medical advice, diagnosis, or treatment. All content, including text, graphics, images, and information, contained on or available through this website is for general information purposes only. Good Grief makes no representation and assumes no responsibility for the accuracy of the information contained on or available through this website. You are encouraged to confirm any information obtained from or through this website with other sources and to consult a medical professional, if desired. <strong>NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY SEEKING MEDICAL TREATMENT BECAUSE OF SOMETHING YOU HAVE READ OR ACCESSED THROUGH THIS WEBSITE.</strong> Our purpose is to promote self awareness and assistance in self-healing. Always seek the advice of a medical professional if you have questions about your mental health or wellbeing.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
