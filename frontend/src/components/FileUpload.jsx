import React from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      
      handleUpload(uploadedFile);
    }
  };

  const handleUpload = async (fileToUpload) => {
    const formData = new FormData();
    formData.append('file', fileToUpload);

    try {
      const response = await axios.post('http://localhost:8000/upload/', formData);

      console.log('Upload response:', response.data);

      if (onUploadSuccess) {
        onUploadSuccess(fileToUpload.name);
     
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">

      
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-row items-center justify-center w-36 h-12 border-2 border-gray-400 rounded-md hover:bg-gray-100 transition space-x-2 px-2"
>
         <div className="flex items-center justify-center w-8 h-8 border border-gray-600 rounded-full text-lg font-bold">
           +
         </div>
         <p className="text-sm text-gray-700 sm:text-sm">Upload PDF</p>
      </label>

      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleFileChange}
      />
     
    </div>
  );
};

export default FileUpload;

