import React from 'react';

  function Result(props) {
    return (
      <div className="result">
        Your stage is <strong>{props.quizResult}</strong>!
      </div>
    );
  }


export default Result;