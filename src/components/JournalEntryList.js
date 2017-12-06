import React from 'react';

class JournalEntryList extends React.Component {

  render() {
    return(
        <ul className='journal-entries-list-container'>
          {this.props.journalEntries.map((journal) =>
            <li>
              {journal.content}
            </li>
          )}
        </ul>
      )
  }
}

export default JournalEntryList;
