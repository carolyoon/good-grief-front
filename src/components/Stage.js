import React from 'react';
import Denial from './Denial';
import Anger from './Anger';
import Bargaining from './Bargaining';
import Depression from './Depression';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

class Stage extends React.Component {
  render() {
    return(
      <div className='stage-container'>
        <Denial  />
        <Anger />
        <Bargaining />
        <Depression />
      </div>
    )
  }
}

export default Stage;
