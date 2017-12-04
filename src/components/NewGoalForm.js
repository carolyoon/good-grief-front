import React from 'react';
import axios from 'axios';

import * as FontAwesome from 'react-icons/lib/fa';

class NewGoalForm extends React.Component {
  constructor() {
    super();
    this.state = {
      goalFormText: '',
      formSubmitted: false,
    };

    this.updateFormText = this.updateFormText.bind(this);
    this.submitNewGoal = this.submitNewGoal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(event) {
    event.preventDefault()
    this.submitNewGoal()
  }

  handleChange(event) {
    const inputText = event.target.value
    this.updateFormText(inputText)
  }

  render() {
    if(!this.props.displayNewGoalForm){
      return(
        <div>
          <button className='new-goal-button' onClick={this.props.toggleGoalFormState}>
            <FontAwesome.FaPlus />
          </button>
        </div>
    )} else if(this.props.displayNewGoalForm && !this.state.formSubmitted){
        return(
          <form onSubmit={this.handleSubmit}>
            <label>
              New Goal:
              <input type='text' onChange={this.handleChange} value={this.state.goals} />
            </label>
            <input type='submit' value='Create New Goal' />
        </form>
      )
    }
  }
}

export default NewGoalForm;