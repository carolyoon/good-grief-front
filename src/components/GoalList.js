import React from 'react';

class GoalList extends React.Component {

  render() {
      return(
        <ul>
          <li className='goals-list-container'>
            <input type='checkbox' defaultChecked={this.props.goalCompleted} onChange={this.props.updateGoal} />
            {this.props.goal.content}
          </li>
        </ul>
      )
  }
}

export default GoalList;