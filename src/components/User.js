import React from 'react';
import axios from 'axios';
import GoalList from './GoalList';
import JournalEntryList from './JournalEntryList';
import NewJournalEntryForm from './NewJournalEntryForm';
import NewGoalForm from './NewGoalForm';
import Tracker from './Tracker';

class User extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userId: '',
      selectedOption: 'Goals',
      options: [
        'Goals',
        'Journal Entries'
      ],
      journalEntries: [],
      goals: [],
      displayNewJournalEntryForm: false,
    };

    this.goalsCall = this.goalsCall.bind(this)
    this.journalEntriesCall = this.journalEntriesCall.bind(this)
    this.addGoal = this.addGoal.bind(this)
    this.addJournalEntry = this.addJournalEntry.bind(this)
    this.updateGoal = this.updateGoal.bind(this)
    this.deleteCompletedGoal = this.deleteCompletedGoal.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this)
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
        const journalEntries = response.data
        that.setState({ journalEntries })
      })
      .catch((error) => console.log('Fail to fetch journal entries.', error))
    }

    componentDidMount () {
      this.goalsCall()
      this.journalEntriesCall()
    }

    addGoal (newGoal) {
      let goals = this.state.goals
      goals.unshift(newGoal)
      this.setState({ goals })
    }

    addJournalEntry (newJournalEntry) {
      let journalEntries = this.state.journalEntries
      journalEntries.unshift(newJournalEntry)
      this.setState({ journalEntries, displayNewJournalEntryForm: true })
    }

    updateGoal (index) {
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

    deleteCompletedGoal (index) {
      const goal = this.state.goals[index]
      const goals = [...this.state.goals]
      axios.delete(`/api/users/${this.props.match.params.id}/goals/${goal.id}`)
      .then(response => {
        // goals[index] = response.data.goal
        this.setState(prevState => ({
        goals: prevState.response.data.goal.filter( goal => goal !== index)
      }))
      //   this.setState({ goals })
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

    render () {
      return (
        <div className='user-profile-container'>

          <div className='div-for-hover-item'>
            <p className='quote-body'>“Life always waits for some crisis to occur before revealing itself at its most brilliant.”</p>
              <div className='hidden-text'><p></p>Paulo Coelho</div>
          </div>

          <hr/>

          <div className='stage-tracker-container'>
            <Tracker
              stageId={this.props.currentUser ? this.props.currentUser.stage_id : null}
            />
          </div>

          <ul className='options'>
            {this.state.options.map((option) =>
              <li
                style={option === this.state.selectedOption ? { color: '#003399' } : null}
                onClick={() => this.handleClick(option)}
                key={option}>
                {option}
              </li>
              )}
          </ul>

        {this.state.selectedOption === 'Goals' && this.props.currentUser &&
        <div className='goal-container'>
          <NewGoalForm
            userId={this.props.currentUser.id}
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

        {this.state.selectedOption === 'Journal Entries' && this.props.currentUser &&
        <div className='journal-entry-container'>
          <NewJournalEntryForm
            userId={this.props.currentUser.id}
            journalEntries={this.state.journalEntries}
            addJournalEntry={this.addJournalEntry}
            displayNewJournalEntryForm={this.state.displayNewJournalEntryForm}
            toggleJournalEntryFormState={this.toggleJournalEntryFormState}
          />

          <JournalEntryList
            journalEntries={this.state.journalEntries}
          />
        </div>
        }

      </div>
    )
  }
}

export default User;