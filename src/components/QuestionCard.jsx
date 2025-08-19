import React from 'react';


const QuestionCard = ({ question, selected, onAnswer }) => {
return (
<div className="border p-4 rounded shadow">
<h2 className="text-lg font-semibold mb-4">Q{question.id}. {question.question}</h2>
<div className="space-y-2">
{question.options.map((opt, idx) => {
const optionValue = opt.slice(0, 1);
return (
<button
key={idx}
className={`block w-full text-left px-4 py-2 border rounded cursor-pointer
${selected === optionValue ? 'bg-blue-100 border-blue-500' : 'bg-white'}`}
onClick={() => onAnswer(question.id, optionValue)}
>
{opt}
</button>
);
})}
</div>
</div>
);
};


export default QuestionCard;
