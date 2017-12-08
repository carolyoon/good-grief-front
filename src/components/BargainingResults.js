import React from 'react'
import { Link } from 'react-router-dom'

function BargainingResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result-container'>
      <p className='result-sentence'>
        Based on your answers, your suggested stage is <span className='result'>{props.bargainingQuizResult}</span>
      </p>

      <Link className='result-link' to='/bargaining' onClick={() => updateStageId(3)}>Stay in Bargaining
      </Link>
      |
      <Link className='result-link' to='/depression' onClick={() => updateStageId(4)}>Move on to Depression
      </Link>
    </div>
  )
}

export default BargainingResults
