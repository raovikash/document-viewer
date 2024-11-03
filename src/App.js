import React, { useState } from 'react';
import FileViewer from './components/FileViewer';
import './App.css';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const handleContentChange = (e) => {
    setFileContent(e.target.value);
  };

  const handleExtensionChange = (e) => {
    setFileExtension(e.target.value);
  };

  return (
    <div className="App">
      <h1>File Viewer</h1>
      
      <div className="input-section">
        <textarea
          placeholder="Paste base64 file content here"
          value={fileContent}
          onChange={handleContentChange}
        />
        <input
          type="text"
          placeholder="File extension (e.g., .docx, .pdf, .png)"
          value={fileExtension}
          onChange={handleExtensionChange}
        />
      </div>

      {fileContent && fileExtension && (
        <div className="viewer-section">
          <h2>File Preview</h2>
          <FileViewer base64Content={fileContent} extension={fileExtension} />
        </div>
      )}
    </div>
  );
}

export default App;
