import React from 'react';

class Registration extends React.Component {
  render() {
    return (
      <div>
        <form className="registration">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button type="submit" value="Register">Submit</button>
        </form>
        <div className="stage-quiz-links">
          <p>Take a quiz to determine your stage</p>
            <ol>
              <li>Denial</li>
              <li>Anger</li>
              <li>Bargaining</li>
              <li>Depression</li>
              <li>Acceptance</li>
            </ol>
            <p>Or choose a stage to get started</p>
            <span className="set-own-stage">
              <button type="dropdown" value="set-own-stage">Set Your Stage</button>
            </span>
        </div>
      </div>
    )
  }
}

export default Registration;