import React from 'react'
import { Link } from 'react-router-dom'

function AngerResults (props) {
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.angerQuizResult}</strong>!
        <br />
        <Link to='/anger'>
        <button>Stay in Anger</button>
      </Link><br />
      <Link to='/bargaining'>
      <button>Move on to Bargaining</button>
    </Link>

    </div>
  )
}

export default AngerResults
