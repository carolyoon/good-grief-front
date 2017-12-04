import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';

class NewAdvicePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAdvicePost: {
        content: ''
      },
      submitted: false,
      createdAdviceId: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, fieldName) {
    const newAdvicePost = {...this.state.NewAdvicePost}
    newAdvicePost[fieldName] = event.target.value
    this.setState({newAdvicePost})
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

  render() {
   return(
    <div className="advice-post-form-container">
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>Your Previous Stage:</p>
          <select name='stages' className="stages-dropdown"> 
            <option value="denial">Denial</option>
            <option value="anger">Anger</option>
            <option value="bargaining">Bargaining</option>
            <option value="depression">Depression</option>
            <option value="acceptance">Acceptance</option>
          </select>
          <br /><br />
          <p>Leave Advice:</p> 
          <textarea type='input' value={this.state.newAdvicePost.content} onChange={(e) => this.handleChange(e, 'content')}></textarea>
        </label><br />
        <input type='submit' value='Submit Post' />
      </form>
    </div>
    )}
}

export default NewAdvicePostForm;
