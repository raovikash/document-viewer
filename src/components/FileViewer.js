import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { renderAsync } from 'docx-preview';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileViewer = ({ base64Content, extension }) => {
  const [isDocxRendered, setIsDocxRendered] = useState(false);
  const docxContainerRef = useRef(null);

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const renderDocx = useCallback(async () => {
    try {
      const arrayBuffer = base64ToArrayBuffer(base64Content);
      await renderAsync(arrayBuffer, docxContainerRef.current, docxContainerRef.current, {
        className: 'docx-viewer',
        inWrapper: true,
      });
      setIsDocxRendered(true);
    } catch (error) {
      console.error('Error rendering DOCX:', error);
      if (docxContainerRef.current) {
        docxContainerRef.current.innerHTML = '<p>Error rendering document</p>';
      }
    }
  }, [base64Content]);

  useEffect(() => {
    if ((extension.toLowerCase() === '.docx' || extension.toLowerCase() === '.doc') && !isDocxRendered) {
      renderDocx();
    }
  }, [base64Content, extension, isDocxRendered, renderDocx]);

  const renderContent = () => {
    switch (extension.toLowerCase()) {
      case '.doc':
      case '.docx':
        return <div ref={docxContainerRef} style={{ width: '100%', height: '100%' }} />;
      case '.pdf':
        return (
          <Document file={`data:application/pdf;base64,${base64Content}`}>
            <Page pageNumber={1} />
          </Document>
        );
      case '.png':
        return <img src={`data:image/png;base64,${base64Content}`} alt="Rendered content" style={{ maxWidth: '100%' }} />;
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <div className="file-viewer" style={{ width: '100%', height: '100%' }}>
      {renderContent()}
    </div>
  );
};

export default FileViewer;
