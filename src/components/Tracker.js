import React from 'react'

class Tracker extends React.Component {
  constructor () {
    super()
    this.renderStage = this.renderStage.bind(this)
  }

  renderStage () {
    if (this.props.stageId === 1) {
      return (
        <header>
          <a href='/denial' onClick={this.handle} style={{color: 'red'}}>Denial</a>
          <a href='/anger' onClick={this.handle} >Anger</a>
          <a href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/depression' onClick={this.handle} >Depression</a>
          <a href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 2) {
      return (
        <header>
          <a href='/denial' onClick={this.handle} >Denial</a>
          <a href='/anger' onClick={this.handle} style={{color: 'red'}} >Anger</a>
          <a href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/depression' onClick={this.handle} >Depression</a>
          <a href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 3) {
      return (
        <header>
          <a href='/denial' onClick={this.handle} >Denial</a>
          <a href='/anger' onClick={this.handle} >Anger</a>
          <a href='/bargaining' onClick={this.handle} style={{color: 'red'}} >Bargaining</a>
          <a href='/depression' onClick={this.handle} >Depression</a>
          <a href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 4) {
      return (
        <header>
          <a href='/denial' onClick={this.handle} >Denial</a>
          <a href='/anger' onClick={this.handle} >Anger</a>
          <a href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/depression' onClick={this.handle} style={{color: 'red'}} >Depression</a>
          <a href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 5) {
      return (
        <header>
          <a href='/denial' onClick={this.handle} >Denial</a>
          <a href='/anger' onClick={this.handle} >Anger</a>
          <a href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/depression' onClick={this.handle} >Depression</a>
          <a href='/acceptance' onClick={this.handle} style={{color: 'red'}} >Acceptance</a>
        </header>
      )
    }
  }

  render () {
    return (
      <div className='tracker-container'>
        {this.renderStage()}
      </div>
    )
  }
}

export default Tracker
