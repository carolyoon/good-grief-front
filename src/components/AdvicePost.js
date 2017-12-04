import React from 'react';

class AdvicePost extends React.Component {
  render() {
    return(
    <div className='advice-posts-container'>
     <p>{this.props.content}</p>
    </div>
    )
  }
}

export default AdvicePost;
