import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
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
    this.displayOption = this.displayOption.bind(this);
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this);
    this.toggleGoalFormState = this.toggleGoalFormState.bind(this);
    this.setId = this.setId.bind(this);
  }

  goalsCall() {
     axios.get(`/api/users/${this.state.userId}/goals`)
    .then(function(response) {
      console.log(response)
      const goals = []
      response.data.map(goal => goals.push(goal))
      this.setState({ goals })
    })
  }

  journalEntriesCall() {
    axios.get(`/api/users/${this.state.userId}/journal_entries`)
    .then(function(response) {
      console.log(response)
      const journal_entries = []
      response.data.map(journal_entry => journal_entries.push(journal_entry))
      this.setState({ journal_entries })
    })
  }

  setId() {
    const userId = this.props.match.params.id
    this.setState({userId})
  }

  componentDidMount() {
    this.setId();
    this.goalsCall();
    this.journalEntriesCall();
  }

  handleClick(option) {
    this.setState({ selectedOption: option })
  }

  displayOption() {
    if(this.state.selectedOption === 'Goals'){
      return (
        <div className='goals-view-list-container'>
          <ul>
            {this.state.goals.map((goal) =>
              <li className='list-item'>{goal}</li>
            )}
          </ul>

        </div>
      );
    }
    if(this.state.selectedOption === 'Journal Entries'){
      return (
        <div className='journal-entries-view-list-container'>
          <ul>
            {this.state.journal_entries.map((journal_entry) =>
              <li className='list-item'>{journal_entry}</li>
            )}
          </ul>
        </div>
      );
    }
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

        <div className='goals-container'>
          <NewGoalForm
            userId={this.props.match.params.id}
            displayNewGoalForm={this.state.displayNewGoalForm}
            toggleGoalFormState={this.toggleGoalFormState}
          />

          <ul>
            {this.state.goals.map((goal) => {
              return(
                <div className='goals-list-container'>
                  <li>{goal.content}</li>
                </div>
              )
            })}
          </ul>
        </div>

        <div className='journal-entries-container'>
          <NewJournalEntryForm
            userId={this.props.match.params.id}
            displayNewJournalEntryForm={this.state.displayNewJournalEntryForm}
            toggleJournalEntryFormState={this.toggleJournalEntryFormState}
          />

          <ul>
            {this.state.journal_entries.map((journal) => {
              return (
                <div className='journal-entries-list-container'>
                  <li>{journal.content}</li>
                </div>
              )
            })}
          </ul>
        </div>
        <div>
          {this.displayOption()}
        </div>

      </div>
    );
  }
}

export default User;