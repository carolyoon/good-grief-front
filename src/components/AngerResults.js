import React from 'react'
import { Link } from 'react-router-dom'

function AngerResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({stage_id: newStageId})
  }
  return (
    <div className='result-container'>
      <p className='result-sentence'>
        Based on your answers, your suggested stage is <span className='result'>{props.angerQuizResult}</span>
      </p>

      <Link className='result-link' to='/anger' onClick={() => updateStageId(2)}>Stay in Anger
      </Link>
      |
      <Link className='result-link' to='/bargaining' onClick={() => updateStageId(3)}>Move on to Bargaining
      </Link>
    </div>
  )
}

export default AngerResults
