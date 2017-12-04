import React from 'react';

function Result(props) {
    return (
      <div className="result">
        Based on your answers, your suggested stage is <strong>{props.quizResult}</strong>!
      </div>
    );
  }


export default Result;