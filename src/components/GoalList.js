import React from 'react';

class GoalList extends React.Component {

  render() {
      return(
        <ul className='goals-list-container round-checkbox'>
          <li className='label' onClick={this.props.deleteCompletedGoal}>
            <input type='checkbox' checked={this.props.goalCompleted} onChange={this.props.deleteCompletedGoal} />
            {this.props.goal.content}
          </li>
        </ul>
      )
  }
}

export default GoalList;