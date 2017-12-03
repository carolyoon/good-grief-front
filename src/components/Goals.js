import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import * as FontAwesome from 'react-icons/lib/fa';

class Goals extends React.Component {
  constructor() {
    super();
    this.state = {
      goals:[],
      goalFormText: ''
    };

    this.completeGoal = this.completeGoal.bind(this);
    this.updateFormText = this.updateFormText.bind(this);
    this.submitNewGoal = this.submitNewGoal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  completeGoal(index) {
    const goal = this.state.goals[index]
    const status = !goal['completed']
    const goals = [...this.state.goals]
    goals[index]['completed'] = status
    axios.put('http://localhost:3001/goals/' + goal.id + `?goal[completed]=${status}`)
    this.setState({ goals })
  }

  updateFormText(goalFormText) {
    this.setState({ goalFormText })
  }

  submitNewGoal() {
    const payload = `?goal[content]=${this.state.goalFormText}`
    axios.post('http://localhost:3001/goals' + payload)
    .then(response => response.json())
    .then(data => {
      const goals = [...this.state.goals]
      goals.push(data)
      this.setState({ goals })
    })
    const goalFormText = ''
    this.setState({ goalFormText })
  }

  handleClick(event) {
    this.completeGoal(this.state.goals.id)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.submitNewGoal()
  }

  handleChange(event) {
    const inputText = event.target.value
    this.props.updateFormText(inputText)
  }

  render() {
    return(
      <div className='goal-form'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} value={this.state.goalFormText} />
          <input type='submit' value='Create New Goal' />
        </form>
      </div>
    );
  }
}

export default Goals;