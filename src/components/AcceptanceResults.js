import React from 'react'
import { Link } from 'react-router-dom'

function AcceptanceResults (props) {

  function updateStageId(newStageId) {
    props.updateCurrentUser({ stage_id: newStageId })
  }

  return (
    <div className='result'>
      <Link to='/acceptance'>
        <button onClick={() => updateStageId(5)}>Stay in Acceptance</button>
      </Link><br />
      <Link to={`/profile/${props.currentUserId}`}>
        <button onClick={() => updateStageId(5)}>Go to Your Profile</button>
      </Link><br />
    </div>
  )
}

export default AcceptanceResults
