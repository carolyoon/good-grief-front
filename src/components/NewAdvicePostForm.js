import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';

class NewAdvicePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAdvicePost: {
        'content': '',
        'stageId': ''
      },
      submitted: false,
      createdAdviceId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, fieldName) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3001/advice_posts', {advice_post: this.state.newAdvicePost})
    .then(({data}) => {
      const newAdvicePost = Object.assign({}, {...this.state.newAdvicePost}, data)
      this.setState({newAdvicePost, submitted: true})
    })
    .catch((error) => {console.log('Error in creating a new advice post.', error)})
  }

  // handleSubmit(event) {
  //   event.preventDefault()
  //   axios.post(`/api/advice_posts`, {advice_post: this.state.newAdvicePost})
  //   .then(({data}) => {
  //     let newAdvicePost = Object.assign({}, {...this.state.newAdvicePost}, data)
  //     let advice_posts = this.props.journal_entries
  //     let displayNewJournalEntryForm = this.props.displayNewJournalEntryForm
  //     journal_entries.push({journal_entry: newJournalEntry})
  //     this.setState({newJournalEntry, journal_entries, formSubmitted: true, displayNewJournalEntryForm: false})
  //   })
  //   .catch((error) => {console.log('Error in creating a new journal entry.', error)})
  // }

  render() {
   return(
    <div className="advice-post-form-container">
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>Your Previous Stage:</p>

          <select className="stages-dropdown" name="stageId" onChange={(e) => this.handleChange(e, 'content')}>
            <option value='1'>Denial</option>
            <option value='2'>Anger</option>
            <option value='3'>Bargaining</option>
            <option value='4'>Depression</option>
            <option value='5'>Acceptance</option>
          </select>
          <br /><br />
          <p>Leave Advice:</p>
          <textarea type='input' value={this.state.newAdvicePost.content} name="adviceContent" onChange={(e) => this.handleChange(e, 'content')}></textarea>
        </label><br />
        <input type='submit' value='Submit Post' />
      </form>
    </div>
    )}
}

export default NewAdvicePostForm;
