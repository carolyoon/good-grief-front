import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import GoalList from './GoalList';
import JournalEntryList from './JournalEntryList';
import NewJournalEntryForm from './NewJournalEntryForm';
import NewGoalForm from './NewGoalForm';

class User extends React.Component {
  constructor() {
    super();
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
    this.handleClick = this.handleClick.bind(this);
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this);
    this.toggleGoalFormState = this.toggleGoalFormState.bind(this);
  }

  goalsCall() {
    const that = this
     axios.get(`/api/users/${this.props.match.params.id}/goals`)
    .then(function(response) {
      const goals = response.data
      that.setState({ goals })
    })
    .catch((error) => console.log('Fail to fetch goals.', error))
  }

  journalEntriesCall() {
    const that = this
    axios.get(`/api/users/${this.props.match.params.id}/journal_entries`)
    .then(function(response) {
      const journal_entries = response.data
      that.setState({ journal_entries })
    })
    .catch((error) => console.log('Fail to fetch journal entries.', error))
  }

  componentDidMount() {
    this.goalsCall();
    this.journalEntriesCall();
  }

  handleClick(option) {
    this.setState({ selectedOption: option })
  }

  toggleJournalEntryFormState() {
    this.setState(prevState => ({
      displayNewJournalEntryForm: !prevState.displayNewJournalEntryForm
    }));
  }

  toggleGoalFormState() {
    this.setState(prevState => ({
      displayNewGoalForm: !prevState.displayNewGoalForm
    }));
  }

  render() {
    return (
      <div className='user-profile-container'>
        <h1>User's Profile</h1>
        <ul className='options'>
          {this.state.options.map((option) =>
            <li
              style={option === this.state.selectedOption ? { color: '#d0021b' } : null }
              onClick={() => this.handleClick(option)}
              key={option}>
              {option}
            </li>
          )}
        </ul>

        <div>
        {this.state.selectedOption === 'Goals' &&
        <div>
          <NewGoalForm
            userId={this.state.userId}
            displayNewGoalForm={this.state.displayNewGoalForm}
            toggleGoalFormState={this.toggleGoalFormState}
          />
          <GoalList
            userId={this.state.userId}
            goals={this.state.goals}
            selectedOption={this.state.selectedOption}
          />
          </div>
        }
        </div>

        <div>
          {this.state.selectedOption === 'Journal Entries' &&
          <div>
          <NewJournalEntryForm
            userId={this.state.userId}
            displayNewJournalEntryForm={this.state.displayNewJournalEntryForm}
            toggleJournalEntryFormState={this.toggleJournalEntryFormState}
          />
          <JournalEntryList
            userId={this.state.userId}
            journal_entries={this.state.journal_entries}
            selectedOption={this.state.selectedOption}
          />
          </div>
          }
        </div>

      </div>
    );
  }
}

export default User;