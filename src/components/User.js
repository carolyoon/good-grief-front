import React from 'react'
import axios from 'axios'
import GoalList from './GoalList'
import JournalEntryList from './JournalEntryList'
import NewJournalEntryForm from './NewJournalEntryForm'
import NewGoalForm from './NewGoalForm'

class User extends React.Component {
  constructor () {
    super()
    this.state = {
      userId: '',
      selectedOption: 'Goals',
      options: [
        'Goals',
        'Journal Entries'
      ],
      journal_entries: [],
      goals: [],
      displayNewJournalEntryForm: false,
      displayNewGoalForm: false
    };
    
    this.goalsCall = this.goalsCall.bind(this);
    this.journalEntriesCall = this.journalEntriesCall.bind(this);
    this.addGoal = this.addGoal.bind(this);
    this.addJournalEntry = this.addJournalEntry.bind(this);
    this.updateGoal = this.updateGoal.bind(this);
    this.deleteCompletedGoal = this.deleteCompletedGoal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this);
 }

  goalsCall () {
    const that = this
    axios.get(`/api/users/${this.props.match.params.id}/goals`)
    .then(function (response) {
      const goals = response.data
      that.setState({ goals })
    })
    .catch((error) => console.log('Fail to fetch goals.', error))
  }

  journalEntriesCall () {
    const that = this
    axios.get(`/api/users/${this.props.match.params.id}/journal_entries`)
    .then(function (response) {
      const journal_entries = response.data
      that.setState({ journal_entries })
    })
    .catch((error) => console.log('Fail to fetch journal entries.', error))
  }

  componentDidMount () {
    this.goalsCall()
    this.journalEntriesCall()
  }
  
  addGoal(newGoal) {
    let goals = this.state.goals
    goals.unshift(newGoal)
    this.setState({ goals })
  }

  addJournalEntry(newJournalEntry) {
    let journal_entries = this.state.journal_entries
    journal_entries.unshift(newJournalEntry)
    this.setState({ journal_entries })
  }

  updateGoal(index) {
    const appTarget = this
    const goal = this.state.goals[index]
    const status = !goal['completed']
    const goals = [...this.state.goals]
    goals[index]['completed'] = status
    axios.put(`/api/users/${this.props.match.params.id}/goals/${goal.id}` + `?goal[completed]=${status}`)
    .then(response => {
      goals[index] = response.data.goal
      appTarget.setState({ goals })
    })
    .catch((error) => console.log('Fail to update a goal.', error))
  }

  deleteCompletedGoal(index) {
    const goal = this.state.goals[index]
    const goals = [...this.state.goals]
    axios.delete(`/api/users/${this.props.match.params.id}/goals/${goal.id}`)
    .then(response => {
      goals[index] = response.data.goal
      this.setState({ goals })
    })
    .catch((error) => console.log('Error in removing a goal.', error))
  }

  handleClick (option) {
    this.setState({ selectedOption: option })
  }

  toggleJournalEntryFormState () {
    this.setState(prevState => ({
      displayNewJournalEntryForm: !prevState.displayNewJournalEntryForm
    }))
  }

  render() {
    return (
      <div className='user-profile-container'>
        <h1>User's Profile</h1>

        <ul className='options'>
          {this.state.options.map((option) =>
            <li
              style={option === this.state.selectedOption ? { color: '#d0021b' } : null}
              onClick={() => this.handleClick(option)}
              key={option}>
              {option}
            </li>
            )}
        </ul>

        {this.state.selectedOption === 'Goals' &&
        <div>
          <NewGoalForm
            userId={this.state.userId}
            goals={this.state.goals}
            addGoal={this.addGoal}
          />

        {this.state.goals.map((goal, index) =>
          <GoalList
            index={index}
            goal={goal}
            goalCompleted={goal['completed']}
            updateGoal={() => this.updateGoal(index)}
            deleteCompletedGoal={() => this.deleteCompletedGoal(index)}
          />
        )}
        </div>
        }

        {this.state.selectedOption === 'Journal Entries' &&
        <div>
          <NewJournalEntryForm
            userId={this.props.match.params.id}
            journal_entries={this.state.journal_entries}
            addJournalEntry={this.addJournalEntry}
            displayNewJournalEntryForm={this.state.displayNewJournalEntryForm}
            toggleJournalEntryFormState={this.toggleJournalEntryFormState}
          />

          <JournalEntryList
            journal_entries={this.state.journal_entries}
          />
        </div>
        }
      </div>
    )
  }
}

export default User
