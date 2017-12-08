import React from 'react';

class Tracker extends React.Component {
  constructor (props) {
    super(props);

    this.renderStage = this.renderStage.bind(this);
  }

  renderStage () {
    if (this.props.stageId === 1) {
      return (
        <header>
          <a className='stages-tracker-buttons' href='/denial' onClick={this.handle} style={{background: '#DF744A', color: '#FFFFFF'}}>Denial</a>
          <a className='stages-tracker-buttons' href='/anger' onClick={this.handle} >Anger</a>
          <a className='stages-tracker-buttons' href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a className='stages-tracker-buttons' href='/depression' onClick={this.handle} >Depression</a>
          <a className='stages-tracker-buttons' href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 2) {
      return (
        <header>
          <a className='stages-tracker-buttons' href='/denial' onClick={this.handle} >Denial</a>
          <a className='stages-tracker-buttons' href='/anger' onClick={this.handle} style={{background: '#DF744A', color: '#FFFFFF'}} >Anger</a>
          <a className='stages-tracker-buttons' href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a className='stages-tracker-buttons' href='/depression' onClick={this.handle} >Depression</a>
          <a className='stages-tracker-buttons' href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 3) {
      return (
        <header>
          <a className='stages-tracker-buttons' href='/denial' onClick={this.handle} >Denial</a>
          <a className='stages-tracker-buttons' href='/anger' onClick={this.handle} >Anger</a>
          <a className='stages-tracker-buttons' href='/bargaining' onClick={this.handle} style={{background: '#DF744A', color: '#FFFFFF'}} >Bargaining</a>
          <a className='stages-tracker-buttons' href='/depression' onClick={this.handle} >Depression</a>
          <a className='stages-tracker-buttons' href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 4) {
      return (
        <header>
          <a className='stages-tracker-buttons' href='/denial' onClick={this.handle} >Denial</a>
          <a className='stages-tracker-buttons' href='/anger' onClick={this.handle} >Anger</a>
          <a className='stages-tracker-buttons' href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a className='stages-tracker-buttons' href='/depression' onClick={this.handle} style={{background: '#DF744A', color: '#FFFFFF'}} >Depression</a>
          <a className='stages-tracker-buttons' href='/acceptance' onClick={this.handle} >Acceptance</a>
        </header>
      )
    }
    if (this.props.stageId === 5) {
      return (
        <header>
          <a className='stages-tracker-buttons' href='/denial' onClick={this.handle} >Denial</a>
          <a className='stages-tracker-buttons' href='/anger' onClick={this.handle} >Anger</a>
          <a className='stages-tracker-buttons' href='/bargaining' onClick={this.handle} >Bargaining</a>
          <a className='stages-tracker-buttons' href='/depression' onClick={this.handle} >Depression</a>
          <a className='stages-tracker-buttons' href='/acceptance' onClick={this.handle} style={{background: '#DF744A', color: '#FFFFFF'}} >Acceptance</a>
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

export default Tracker;