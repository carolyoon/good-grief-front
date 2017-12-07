import React from 'react'
import { Link } from 'react-router-dom'

function DenialResults (props) {
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.denialQuizResult}</strong>!
        <br />
        <Link to='/denial'>
        <button>Stay in Denial</button>
      </Link><br />
      <Link to='/anger'>
      <button>Move on to Anger</button>
    </Link>

    </div>
  )
}

export default DenialResults
