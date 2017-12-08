  import React from 'react';
  import Question from '../components/Question';
  import QuestionCount from '../components/QuestionCount';
  import AnswerOption from '../components/AnswerOption';

  function Quiz(props) {

    function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

    return (
      <div className="quiz">
        <div className='question-count'>
          <QuestionCount
           counter={props.questionId}
           total={props.questionTotal}
          />
        </div>

        <div className='question-body'>
          <Question content={props.question} />
          <ul className="answerOptions">
           {props.answerOptions.map(renderAnswerOptions)}
          </ul>
        </div>
      </div>
    );
  }

export default Quiz;