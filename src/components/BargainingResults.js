import React from 'react'
import { Link } from 'react-router-dom'

function BargainingResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.bargainingQuizResult}</strong>!
      <Link to='/bargaining'>
        <button onClick={() => updateStageId(3)}>Stay in Bargaining</button>
      </Link>
      <Link to='/depression'>
        <button onClick={() => updateStageId(4)}>Move on to Depression</button>
    </Link>

    </div>
  )
}

export default BargainingResults
