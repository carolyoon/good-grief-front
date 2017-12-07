import React from 'react';
import Timestamp from 'react-timestamp';

import * as FontAwesome from 'react-icons/lib/fa';

class JournalEntryList extends React.Component {

  render() {
    return(
        <ul className='journal-entries-list-container'>
          {this.props.journalEntries.map((journal) =>
            <li>
              <Timestamp time={journal.created_at} precision={1} className='timestamp' />
              <FontAwesome.FaQuoteLeft className='fa-quote-left' />
              {journal.content}
            </li>
          )}
        </ul>
      )
  }
}

export default JournalEntryList;
