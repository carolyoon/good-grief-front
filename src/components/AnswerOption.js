import React from 'react';

  function AnswerOption(props) {
    return (
      <div className='answers-container'>
        <ul>
          <li className="answerOption">
            <input
              type="radio"
              className="radioCustomButton"
              name="radioGroup"
              checked={props.answerType === props.answer}
              id={props.answerType}
              value={props.answerType}
              disabled={props.answer}
              onChange={props.onAnswerSelected}
            />
            <label className="radioCustomLabel" htmlFor={props.answerType}>
              {props.answerContent}
            </label>
            <div className='check'></div>
          </li>
          <hr />
        </ul>
      </div>
    );
  }

  export default AnswerOption;