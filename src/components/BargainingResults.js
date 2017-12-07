import React from 'react'
import { Link } from 'react-router-dom'

function BargainingResults (props) {
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.bargainingQuizResult}</strong>!
        <br />
        <Link to='/bargaining'>
        <button>Stay in Bargaining</button>
      </Link><br />
      <Link to='/depression'>
      <button>Move on to Depression</button>
    </Link>

    </div>
  )
}

export default BargainingResults
