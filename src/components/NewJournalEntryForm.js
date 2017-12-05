import React from 'react';
import axios from 'axios';

import * as FontAwesome from 'react-icons/lib/fa';

class NewJournalEntryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newJournalEntry: {},
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
    axios.post(`/api/users/${this.props.userId}/journal_entries`, {journal_entry: this.state.newJournalEntry})
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
    )} else if(this.props.displayNewJournalEntryForm && !this.state.formSubmitted){
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            New Entry:
            <input type='text' value={this.state.newJournalEntry.content} onChange={(e) => this.handleChange(e, 'content')} />
          </label>
          <input type='submit' value='Create New Entry' />
        </form>
      )} else {
        return (
          <div></div>
        )
      }
  }
}

export default NewJournalEntryForm;