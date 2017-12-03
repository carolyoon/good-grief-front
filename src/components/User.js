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
      displayNewJournalEntryForm: false
    };

    this.updateOption = this.updateOption.bind(this);
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this);
  }

  updateOption(option) {
    this.setState({ selectedOption: option })
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