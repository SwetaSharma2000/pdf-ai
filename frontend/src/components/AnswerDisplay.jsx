import React, { useEffect, useRef } from 'react';

const AnswerDisplay = ({ qaList }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
  
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [qaList]);

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto px-4 ">
      {qaList.map((qa, idx) => (
        <div key={idx}>
          
          
          <div className="flex items-start bg-white  p-3 rounded shadow mb-2"    >
            <img
              src="/user.png"
              alt="User"
              className="w-8 h-8 rounded-full mr-3 flex-shrink-0   sm:w-8 sm:h-8"
            />
            <div>
              <p className="text-gray-900   text-sm sm:text-base"   >{qa.question}</p>
            </div>
          </div>

          
         
          <div className="flex items-start bg-white p-3 rounded shadow"  >
            <img
              src="/finalminilogo.png"
              alt="Bot"
              className="w-full h-full object-contain rounded-full mr-3 flex-shrink-0   sm:w-8 sm:h-8"
               
            />
            <div>
              <p className="text-gray-900   text-sm sm:text-base"  >{qa.answer || 'Loading...'}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default AnswerDisplay;
