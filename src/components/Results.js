import React from 'react';

function Result(props) {
    return (
      <div className="result-container">
        Based on your answers, your suggested stage is <span className='result'>{props.quizResult}</span>
      </div>
    );
  }


export default Result;