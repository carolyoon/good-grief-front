import React from 'react'
import { Link } from 'react-router-dom'

function DenialResults (props) {
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.quizResult}</strong>!
        <br />
        <Link to='/denial'>Denial
        <button>Stay in Denial</button>
      </Link><br />
      <Link to='/anger'>Anger
      <button>Move on to Anger</button>
    </Link>

    </div>
  )
}

export default DenialResults
