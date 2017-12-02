import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>

          <div className="navigation-bar">
            <Link className="navigation-text" to="/">Home</Link>
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={User} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
