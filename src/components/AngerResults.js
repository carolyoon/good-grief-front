import React from 'react'
import { Link } from 'react-router-dom'

function AngerResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({stage_id: newStageId})
  }
  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.angerQuizResult}</strong>!
      <Link to='/anger'>
        <button onClick={() => updateStageId(2)}>Stay in Anger</button>
      </Link>
      <Link to='/bargaining'>
      <button onClick={() => updateStageId(3)}>Move on to Bargaining</button>
    </Link>

    </div>
  )
}

export default AngerResults
