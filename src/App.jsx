
import React, { useState } from 'react';
import quizData from './data/quiz_data.json';
import QuestionCard from './components/QuestionCard';

function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAnswer = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const handleNext = () => {
    if (current < quizData.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowPopup(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowPopup(false);
  };

  const getScore = () => {
    return quizData.filter(q => answers[q.id] === q.answer).length;
  };

  const totalScore = getScore();
  const percentScore = Math.round((totalScore / quizData.length) * 100);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold"> K-ESG 가이드라인 교육 퀴즈</h1>
      </header>

      {!submitted ? (
        <>
          <div className="text-right text-sm text-gray-500 mb-2">
            진행률: {current + 1} / {quizData.length}
          </div>

          <QuestionCard
            question={quizData[current]}
            selected={answers[quizData[current].id]}
            onAnswer={handleAnswer}
          />

          <div className="mt-4 flex justify-between">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {current === quizData.length - 1 ? '마지막 문제' : '다음'}
            </button>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-xl text-center">
                <p className="mb-4 text-lg">
                  수고하셨습니다!<br />
                  제출하기 버튼을 눌러 점수를 확인하세요.
                </p>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  제출하기
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            총점: {totalScore} / {quizData.length}
          </h2>
          <h3 className="text-lg font-medium text-blue-700 mb-4">
            백분율 점수: {percentScore}점
          </h3>
          <ul className="mt-4 text-left">
            {quizData.map(q => (
              <li key={q.id} className="mb-2">
                <strong>Q{q.id}.</strong> {q.question} <br />
                <span
                  className={
                    answers[q.id] === q.answer
                      ? 'text-green-600'
                      : 'text-red-500'
                  }
                >
                  당신의 답: {answers[q.id] || '미선택'} / 정답: {q.answer}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
