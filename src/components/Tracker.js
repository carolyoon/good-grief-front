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
          <a href='/Denial' onClick={this.handle} style={{color: 'red'}}>Denial</a>
          <a href='/Anger' onClick={this.handle} >Anger</a>
          <a href='/Bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/Depression' onClick={this.handle} >Depression</a>
          <a href='/Acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 2) {
      return (
        <header>
          <a href='/Denial' onClick={this.handle} >Denial</a>
          <a href='/Anger' onClick={this.handle} style={{color: 'red'}} >Anger</a>
          <a href='/Bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/Depression' onClick={this.handle} >Depression</a>
          <a href='/Acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 3) {
      return (
        <header>
          <a href='/Denial' onClick={this.handle} >Denial</a>
          <a href='/Anger' onClick={this.handle} >Anger</a>
          <a href='/Bargaining' onClick={this.handle} style={{color: 'red'}} >Bargaining</a>
          <a href='/Depression' onClick={this.handle} >Depression</a>
          <a href='/Acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 4) {
      return (
        <header>
          <a href='/Denial' onClick={this.handle} >Denial</a>
          <a href='/Anger' onClick={this.handle} >Anger</a>
          <a href='/Bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/Depression' onClick={this.handle} style={{color: 'red'}} >Depression</a>
          <a href='/Acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 5) {
      return (
        <header>
          <a href='/Denial' onClick={this.handle} >Denial</a>
          <a href='/Anger' onClick={this.handle} >Anger</a>
          <a href='/Bargaining' onClick={this.handle} >Bargaining</a>
          <a href='/Depression' onClick={this.handle} >Depression</a>
          <a href='/Acceptance' onClick={this.handle} style={{color: 'red'}} >Acceptance</a>
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
