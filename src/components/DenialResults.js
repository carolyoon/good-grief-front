import React from 'react'
import { Link } from 'react-router-dom'

function DenialResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.denialQuizResult}</strong>!
      <Link to='/denial'>
        <button onClick={() => updateStageId(1)}>Stay in Denial</button>
      </Link><br />
      <Link to='/anger'>
      <button onClick={() => updateStageId(2)}>Move on to Anger</button>
      </Link>
    </div>
  )
}

export default DenialResults
