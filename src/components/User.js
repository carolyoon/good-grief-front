import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import NewJournalEntryForm from './NewJournalEntryForm';

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      journal_entries: [],
      displayNewJournalEntryForm: false
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