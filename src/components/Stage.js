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
      <h2>Stage</h2>
    )
  }
}

export default Stage;