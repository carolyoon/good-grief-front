import React from 'react'
import Denial from './Denial'
import Anger from './Anger'
import Bargaining from './Bargaining'
import Acceptance from './Acceptance'
import Depression from './Depression'

class Stage extends React.Component {

  render () {
    return (
      <div className='stage-container'>
        <Denial />
        <Anger />
        <Bargaining />
        <Depression />
        <Acceptance />
      </div>
    )
  }
}

export default Stage
