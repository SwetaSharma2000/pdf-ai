import React, { useState } from 'react';


const QuestionForm = ({ onQuestionSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (!question.trim()) return;
    onQuestionSubmit(question);
    setQuestion('');
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 px-4   sm:px-4">
    <div className="flex items-center bg-white border border-gray-300  px-4 py-2 shadow-md">
      <input
        type="text"
        placeholder="Send a message..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}

        className="flex-grow outline-none bg-transparent text-black placeholder-gray-500"
      />
      <button
        onClick={handleSubmit}
        className="text-green-600 hover:text-green-800   ml-2"
        title="Submit"
      ><span className="text-2xl ml-2">➤</span></button>
    </div>



  </div>

  );
};

export default QuestionForm;