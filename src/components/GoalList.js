import React from 'react';

class GoalList extends React.Component {

  render() {
      return(
        <ul>
          <li className='goals-list-container' onClick={this.props.deleteCompletedGoal}>
            <input type='checkbox' checked={this.props.goalCompleted} onChange={this.props.deleteCompletedGoal} />
            {this.props.goal.content}
          </li>
        </ul>
      )
  }
}

export default GoalList;