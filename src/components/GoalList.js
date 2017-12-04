import React from 'react';

class GoalList extends React.Component {

  render() {
      return(
        <ul>
          {this.props.goals.map((goal) =>
            <li
              className='goals-list-container'>
              <input type='checkbox' checked={this.props.}
              {goal.content}
            </li>
          )}
        </ul>
      )
  }
}

export default GoalList;