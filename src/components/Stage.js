import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

class Stage extends React.Component {
  constructor() {
    super();
    this.state = {
      advicePosts : []
    }
  }

  render() {
    return(
      <div className='stage-container'>
        <h1>Stage Name</h1>

        <div className='advice-posts-container'>
          <ul>

          </ul>
        </div>
      </div>
    )
  }
}

export default Stage;