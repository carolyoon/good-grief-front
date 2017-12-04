import React from 'react';

class JournalEntryList extends React.Component {

  render() {
    return(
        <ul>
          {this.props.journal_entries.map((journal) =>
            <li
              className='journal-entries-list-container'>
              {journal.content}
            </li>
          )}
        </ul>
      )
  }
}

export default JournalEntryList;