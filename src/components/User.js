import React from 'react'
import axios from 'axios'
import GoalList from './GoalList'
import JournalEntryList from './JournalEntryList'
import NewJournalEntryForm from './NewJournalEntryForm'
import NewGoalForm from './NewGoalForm'
import Tracker from './Tracker'
import PubNub from "pubnub";
import ChatHistory from './ChatHistory';
import PubNubService from "./PubNubService";


class User extends React.Component {
  constructor () {
    super()
    this.state = {
      // userId: '',
      selectedOption: 'Goals',
      options: [
        'Goals',
        'Journal Entries'
      ],
      journalEntries: [],
      goals: [],
      displayNewJournalEntryForm: false,
      displayNewGoalForm: false,
            messages: [
      {
        text:"foo1",
                }
            ],
      currentMessage: "This is my message to you.",
      username:"no-name",
      users:[]
    };
    

    this.goalsCall = this.goalsCall.bind(this)
    this.journalEntriesCall = this.journalEntriesCall.bind(this)
    this.addGoal = this.addGoal.bind(this)
    this.addJournalEntry = this.addJournalEntry.bind(this)
    this.updateGoal = this.updateGoal.bind(this)
    this.deleteCompletedGoal = this.deleteCompletedGoal.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleJournalEntryFormState = this.toggleJournalEntryFormState.bind(this)
    this.pubnub = new PubNub({
      publishKey: "pub-c-50b2965a-2ab4-407f-b560-217a00a43e81",
      subscribeKey: "sub-c-eb8a716c-d9e3-11e7-9445-0e38ba8011c7",
      presenceTimeout: 30
     })
     //init presence service
      this.service = new PubNubService({
           pubnub:this.pubnub,
           channel:'simple-chat'
        });
      //on users update, trigger screen refresh
      this.service.onUserChange((users) => this.setState({ users:users }));
      this.service.onMessage((evt) => {
          this.state.messages.push({
              text:evt.message.text,
              sender:evt.publisher
          });
          this.setState({
              messages: this.state.messages
          })
      });
      this.service.fetchHistory(10,(messages)=>{ this.setState({messages:messages}); });

      this.service.getSelfInfo((info)=>{
          if(info.username) this.setState({username: info.username})
      });

    changedMessage() {
        this.setState({ currentMessage:this.refs.input.value });
    }
    
    sendMessage() {
        this.pubnub.publish({
            channel:"simple-chat",
            message: {
                text:this.refs.input.value,
                sender: this.pubnub.getUUID()

            }
        });
        this.setState({ currentMessage:"" })
    }

    changedUsername() {
        this.setState({ username:this.refs.username.value });
    }
    
    setUsername() {
        this.service.setUserState({username:this.state.username})
    }

    renderUsers() {
        var users = this.state.users.map((user,i)=> {
            return <span key={i}>{user.username}</span>
        });
        return <div className="userlist">{users}</div>
    }

  goalsCall () {
    const that = this
    axios.get(`/api/users/${this.props.match.params.id}/goals`)
    .then(function (response) {
      const goals = response.data
      that.setState({ goals })
    })
    .catch((error) => console.log('Fail to fetch goals.', error))
  }

  journalEntriesCall () {
    const that = this
    axios.get(`/api/users/${this.props.match.params.id}/journal_entries`)
    .then(function (response) {
      const journalEntries = response.data
      that.setState({ journalEntries })
    })
    .catch((error) => console.log('Fail to fetch journal entries.', error))
  }

  componentDidMount () {
    this.goalsCall()
    this.journalEntriesCall()
  }

  addGoal (newGoal) {
    let goals = this.state.goals
    goals.unshift(newGoal)
    this.setState({ goals })
  }

  addJournalEntry (newJournalEntry) {
    let journalEntries = this.state.journalEntries
    journalEntries.unshift(newJournalEntry)
    this.setState({ journalEntries })
  }

  updateGoal (index) {
    const appTarget = this
    const goal = this.state.goals[index]
    const status = !goal['completed']
    const goals = [...this.state.goals]
    goals[index]['completed'] = status
    axios.put(`/api/users/${this.props.match.params.id}/goals/${goal.id}` + `?goal[completed]=${status}`)
    .then(response => {
      goals[index] = response.data.goal
      appTarget.setState({ goals })
    })
    .catch((error) => console.log('Fail to update a goal.', error))
  }

  deleteCompletedGoal (index) {
    const goal = this.state.goals[index]
    const goals = [...this.state.goals]
    axios.delete(`/api/users/${this.props.userId}/goals/${goal.id}`)
    .then(response => {
      goals[index] = response.data.goal
      this.setState({ goals })
    })
    .catch((error) => console.log('Error in removing a goal.', error))
  }

  handleClick (option) {
    this.setState({ selectedOption: option })
  }

  toggleJournalEntryFormState () {
    this.setState(prevState => ({
      displayNewJournalEntryForm: !prevState.displayNewJournalEntryForm
    }))
  }

  render () {
    return (
      <div className='user-profile-container'>
        <h1>User's Profile</h1>
        <Tracker
          stageId={this.props.currentUser.stage_id}
        />
        <ul className='options'>
          {this.state.options.map((option) =>
            <li
              style={option === this.state.selectedOption ? { color: '#003399' } : null}
              onClick={() => this.handleClick(option)}
              key={option}>
              {option}
            </li>
            )}
        </ul>

        {this.state.selectedOption === 'Goals' && this.props.currentUser &&
        <div className='goal-container'>
          <NewGoalForm
            userId={this.props.currentUser.id}
            goals={this.state.goals}
            addGoal={this.addGoal}
          />

          {this.state.goals.map((goal, index) =>
            <GoalList
              index={index}
              goal={goal}
              goalCompleted={goal['completed']}
              updateGoal={() => this.updateGoal(index)}
              deleteCompletedGoal={() => this.deleteCompletedGoal(index)}
            />
          )}
        </div>
        }

        {this.state.selectedOption === 'Journal Entries' && this.props.currentUser &&
        <div className='journal-entry-container'>
          <NewJournalEntryForm
            userId={this.props.currentUser.id}
            journalEntries={this.state.journalEntries}
            addJournalEntry={this.addJournalEntry}
            displayNewJournalEntryForm={this.state.displayNewJournalEntryForm}
            toggleJournalEntryFormState={this.toggleJournalEntryFormState}
          />

          <JournalEntryList
            journalEntries={this.state.journalEntries}
          />
        </div>
        }

        <div className="vbox fill">
                <h1>My Simple Chat</h1>
                <div className="scroll grow">
                    <ChatHistory messages={this.state.messages} service={this.service}/>
                </div>
                <div className="hbox">
                    <label>username</label>
                    <input type="text" ref="username" value={this.state.username}
                           onChange={this.changedUsername.bind(this)}
                    />
                    <button onClick={this.setUsername.bind(this)}>set</button>
                </div>
                <div className="hbox">
                    <input className="grow"
                           ref="input"
                           type="text"
                           value={this.state.currentMessage}
                           onChange={this.changedMessage.bind(this)}
                    />
                    <button
                        onClick={this.sendMessage.bind(this)}
                    >send</button>
                </div>
                <div className="hbox">
                    {this.renderUsers()}
                </div>
            </div>
      </div>
    )
  }
}

export default User
