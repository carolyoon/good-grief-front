import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import NewJournalEntryForm from './NewJournalEntryForm';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOption: 'Goals',
      options: [
        'Goals',
        'Journal Entries'
      ],
      journal_entries: [],
      goals: [],
      displayNewJournalEntryForm: false
    };

    this.goalsCall = this.goalsCall.bind(this);
    this.journalEntriesCall = this.journalEntriesCall.bind(this);
    this.updateOption = this.updateOption.bind(this);
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this);
  }

  goalsCall() {
     axios.get('http://localhost:3001/goals')
    .then(function(response) {
      const goals = []
      response.data.map(goal => goals.push(goal))
      this.setState({ goals })
    })
  }

  journalEntriesCall() {
    axios.get('http://localhost:3001/journal_entries')
    .then(function(response) {
      const journal_entries = []
      response.data.map(journal_entry => journal_entries.push(journal_entry))
      this.setState({ journal_entries })
    })
  }

  componentDidMount() {
    this.goalsCall();
    this.journalEntriesCall();
  }

  updateOption(option) {
    this.setState({ selectedOption: option })
    if(this.state.selectedOption === 'goals'){
      return (
        <div className='goals-view-list-container'>
          <ul>
            {this.state['goals'].map((goal) =>
              <li className='list-item'>{goal}</li>
            )}
          </ul>
        </div>
      )
    }
    if(this.state.selectedOption === 'journal_entries'){
      return (
        <div className='journal-entries-view-list-container'>
          <ul>
            {this.state['journal_entries'].map((journal_entry) =>
              <li className='list-item'>{journal_entry}</li>
            )}
          </ul>
        </div>
      )
    }
  }

  toggleJournalEntryFormState() {
    this.setState(prevState => ({
      displayNewJournalEntryForm: !prevState.displayNewJournalEntryForm
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
              onClick={() => this.updateOption(option)}
              key={option}>
              {option}
            </li>
          )}
        </ul>

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

      </div>
    );
  }
}

export default User;