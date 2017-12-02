import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import * as FontAwesome from 'react-icons/lib/fa';

class NewJournalEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newJournalEntry: {
        content: ''
      },
      formSubmitted: false,
      createdJournalId: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, fieldName) {
    const newJournalEntry = {...this.state.newJournalEntry}
    newJournalEntry[fieldName] = event.target.value
    this.setState({newJournalEntry});
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3001/journal_entries', {journal_entry: this.state.newJournalEntry})
    .then(({data}) => {
      const newJournalEntry = Object.assign({}, {...this.state.newJournalEntry}, data)
      this.setState({newJournalEntry, formSubmitted: true})
    })
    .catch((error) => {console.log('Error in creating a new journal entry.', error)})
  }

  render() {
    if(!this.props.displayNewJournalEntryForm){
      return (
        <div>
          <button className='new-journal-entry-button' onClick={this.props.toggleJournalEntryFormState}>
            <FontAwesome.FaPlus />
          </button>
        </div>
    )} else if(this.props.displayNewJournalEntryForm && !this.state.formSubmitted) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            New Entry:
            <input type='text' value={this.state.newJournalEntry.content} onChange={(e) => this.handleChange(e, 'content')} />
          </label>
        </form>
    )}
  }
}

export default NewJournalEntryForm;