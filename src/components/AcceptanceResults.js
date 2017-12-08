import React from 'react'
import { Link } from 'react-router-dom'

function AcceptanceResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result-container'>
      <Link className='result-link' to='/acceptance' onClick={() => updateStageId(5)}>Stay in Acceptance
      </Link>
      |
      <Link className='result-link' to={`/profile/${props.currentUserId}`} onClick={() => updateStageId(5)}>Go to Your Profile
      </Link>
    </div>
  )
}

export default AcceptanceResults
