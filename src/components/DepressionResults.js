import React from 'react'
import { Link } from 'react-router-dom'

function DepressionResults (props) {
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.depressionQuizResult}</strong>!
        <br />
        <Link to='/depression'>
        <button>Stay in Depression</button>
      </Link><br />
      <Link to='/acceptance'>
      <button>Move on to Acceptance</button>
    </Link>

    </div>
  )
}

export default DepressionResults
