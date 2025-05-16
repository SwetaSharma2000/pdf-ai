import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import QuestionForm from './components/QuestionForm';
import AnswerDisplay from './components/AnswerDisplay';
import axios from 'axios';

const App = () => {
 
  const [qaList, setQaList] = useState([]); // [{ question, answer }]
  const [uploadedFilename, setUploadedFilename] = useState('');


  const handleQuestionSubmit = async (question) => {
    const newQA = { question, answer: '' };
    setQaList((prev) => [...prev, newQA]);

    try {
      const response = await axios.post('http://localhost:8000/ask/', {
        question,
      });

      // Update last QA with answer
      setQaList((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].answer = response.data.answer;
        return updated;
      });
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  return (
    <>
    
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-3 bg-white shadow-md   flex-col  sm:flex-row sm:justify-between sm:items-center">
  {/* Left: AI Planet Logo */}
  <img src="/aiplanetlogo.png" alt="AI Planet Logo" className="h-30 w-30" />

  {/* Right: Upload area */}
  <div className="flex items-center space-x-4   flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
    {/* Uploaded filename */}
    {uploadedFilename && (
      <span className="text-green-600 text-sm font-semibold   truncate max-w-[200px] sm:max-w-full">{uploadedFilename}</span>
    )}

    {/* Upload button */}
    <FileUpload onUploadSuccess={(filename) => setUploadedFilename(filename)} />
  </div>
</div>

 <div className="mt-24 mb-32">
        <AnswerDisplay qaList={qaList} />
      </div>

     
      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-4 shadow-inner">
        <QuestionForm onQuestionSubmit={handleQuestionSubmit} />
      </div>


      </>
    
  );
};

export default App;



