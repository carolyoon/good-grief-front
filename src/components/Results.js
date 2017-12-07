import React from 'react'
import { Link } from 'react-router-dom'

function Result (props) {
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.quizResult}</strong>!
        <br />
      <Link to={`/${props.quizResult}`}>
        <button>Go to Suggested Stage</button>
      </Link><br />
      <p>Or click on link to select another stage</p>
      <Link to='/denial'>Denial</Link>
      <Link to='/anger'>Anger</Link>
      <Link to='/bargaining'>Bargaining</Link>
      <Link to='/depression'>Depression</Link>
      <Link to='/acceptance'>Acceptance</Link>

    </div>
  )
}

export default Result
