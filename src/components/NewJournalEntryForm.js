import React from 'react';
import axios from 'axios';

import * as FontAwesome from 'react-icons/lib/fa';

class NewJournalEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newJournalEntry: {},
      formSubmitted: false,
      createdJournalId: null
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
    axios.post(`/api/users/${this.props.userId}/journal_entries`, {journal_entry: this.state.newJournalEntry})
    .then(({data}) => {
      let newJournalEntry = Object.assign({}, {...this.state.newJournalEntry}, data)
      let journal_entries = this.props.journal_entries
      const displayNewJournalEntryForm = !this.props.displayNewJournalEntryForm
      journal_entries.push({journal_entry: newJournalEntry})
      this.setState({newJournalEntry, journal_entries, formSubmitted: true, displayNewJournalEntryForm})
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
    )} else if(this.props.displayNewJournalEntryForm && !this.state.formSubmitted){
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            New Entry:
            <input type='text' value={this.state.newJournalEntry.content} onChange={(e) => this.handleChange(e, 'content')} />
          </label>
          <input type='submit' value='Create New Entry' />
        </form>
      )} else
        return (
          <div></div>
        )
  }
}

export default NewJournalEntryForm;