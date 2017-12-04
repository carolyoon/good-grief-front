import React from 'react';
import axios from 'axios';

import * as FontAwesome from 'react-icons/lib/fa';

class NewGoalForm extends React.Component {
  constructor() {
    super();
    this.state = {
      newGoal: {
        content: ''
      },
      formSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.prepareGoalParams = this.prepareGoalParams.bind(this);
    this.submitNewGoal = this.submitNewGoal.bind(this);
  }

  handleChange(event, fieldName) {
    const newGoal = {...this.state.newGoal}
    newGoal[fieldName] = event.target.value
    this.setState({ newGoal })
  }

  prepareGoalParams() {
    const goal = {goalParams: this.state.newGoal}
    return goal.goalParams
  }

  submitNewGoal(event) {
    event.preventDefault();
    axios.post(`/api/users/${this.props.userId}/goals`, {goal: this.prepareGoalParams()})
    .then(({data}) => {
      const newGoal = Object.assign({}, {...this.state.newGoal}, data)
      const displayNewGoalForm = !this.props.displayNewGoalForm
      this.setState({ newGoal, formSubmitted: true, displayNewGoalForm })
    })
    .catch((error) => {console.log('Error in creating a new goal.', error)})
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
          <form onSubmit={this.submitNewGoal}>
            <input placeholder='enter goal' onChange={this.handleChange} value={this.state.goals} />
            <button type='submit'>add</button>
        </form>
      )
    }
  }
}

export default NewGoalForm;