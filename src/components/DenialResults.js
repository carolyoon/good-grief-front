import React from 'react'
import { Link } from 'react-router-dom'

function DenialResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result-container'>
      <p className='result-sentence'>
        Based on your answers, your suggested stage is <span className='result'>{props.denialQuizResult}</span>
      </p>

      <Link className='result-link' to='/denial' onClick={() => updateStageId(1)}>Stay in Denial
      </Link>
      |
      <Link className='result-link' to='/anger' onClick={() => updateStageId(2)}>Move on to Anger
      </Link>
    </div>
  )
}

export default DenialResults
