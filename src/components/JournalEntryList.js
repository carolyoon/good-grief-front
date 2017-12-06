import React from 'react';

import * as FontAwesome from 'react-icons/lib/fa';

class JournalEntryList extends React.Component {

  render() {
    return(
        <ul className='journal-entries-list-container'>
          {this.props.journal_entries.map((journal) =>
            <li>
              <FontAwesome.FaQuoteLeft className='fa-quote-left' />
              {journal.content}
            </li>
          )}
        </ul>
      )
  }
}

export default JournalEntryList;