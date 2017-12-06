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
    };

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
    axios.post(`http://localhost:3001/api/users/${this.props.userId}/journal_entries`, {journal_entry: this.state.newJournalEntry})
    .then(({data}) => {
      const displayNewJournalEntryForm = !this.props.displayNewJournalEntryForm
      this.setState({ newJournalEntry: {content: ''}, formSubmitted: true, displayNewJournalEntryForm})
      this.props.addJournalEntry(data.journal_entry)
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
        <form className='journal-entry-form-container' onSubmit={this.handleSubmit}>
          <input placeholder='penny for your thoughts...' type='text' value={this.state.newJournalEntry.content} onChange={(e) => this.handleChange(e, 'content')} />
          <button type='submit'>create</button>
        </form>
      )} else {
        return (
          <div></div>
        )
      }
  }
}

export default NewJournalEntryForm;
