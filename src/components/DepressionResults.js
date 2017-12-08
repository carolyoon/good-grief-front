import React from 'react'
import { Link } from 'react-router-dom'

function DepressionResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result'>
        Based on your answers, your suggested stage is <strong>{props.depressionQuizResult}</strong>! 
      <Link to='/depression'>
        <button onClick={() => updateStageId(4)}>Stay in Depression</button>
      </Link><br />
      <Link to='/acceptance'>
        <button onClick={() => updateStageId(5)}>Move on to Acceptance</button>
      </Link>
    </div>
  )
}

export default DepressionResults
