import React from 'react';
import axios from 'axios';

import * as FontAwesome from 'react-icons/lib/fa';

class NewGoalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGoal: {
        content: ''
      },
      formSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitNewGoal = this.submitNewGoal.bind(this);

    console.log("YAYYYY")
    console.log(this.state.newGoal, this.state.formSubmitted);
  }

  handleChange(event, fieldName) {
    const newGoal = {...this.state.newGoal}
    newGoal[fieldName] = event.target.value
    this.setState({ newGoal })
  }

  submitNewGoal(event) {
    console.log("getting here")
    event.preventDefault();
    axios.post(`http://localhost:3001/api/users/${this.props.userId}/goals`, {goal: this.state.newGoal})
    .then(({data}) => {
      const displayNewGoalForm = !this.props.displayNewGoalForm
      this.setState({ newGoal: {content: ''}, formSubmitted: true, displayNewGoalForm })
      this.props.addGoal(data.goal)
    })
    .catch((error) => {console.log('Error in creating a new goal.', error)})
  }

  render() {
    if(!this.state.formSubmitted){
      return(
        <form className='goal-form-container' onSubmit={this.submitNewGoal}>
          <input placeholder='enter goal' onChange={(event) => this.handleChange(event, 'content')} value={this.state.goals} />
          <button type='submit'>add</button>
          <p>To remove a goal, click on an existing entry.</p>
        </form>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default NewGoalForm;
