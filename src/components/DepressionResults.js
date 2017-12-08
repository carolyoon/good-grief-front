import React from 'react'
import { Link } from 'react-router-dom'

function DepressionResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result-container'>
      <p className='result-sentence'>
        Based on your answers, your suggested stage is <span className='result'>{props.depressionQuizResult}</span>
      </p>

      <Link className='result-link' to='/depression' onClick={() => updateStageId(4)}>Stay in Depression
      </Link>
      |
      <Link className='result-link' to='/acceptance' onClick={() => updateStageId(5)}>Move on to Acceptance
      </Link>
    </div>
  )
}

export default DepressionResults
