import React from 'react';
import PdfViewer from './PDFViewerPage.js';

const PdfModal = ({ base64String, onClose }) => {
  return (
    <div className="PdfModal">
      <div className="PdfModalContent">
        <button className="CloseButton" onClick={onClose}>
          Close
        </button>
        <PdfViewer base64String={base64String} />
      </div>
      <style jsx>{`
        .CloseButton {
            background-color: #333;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          }        
      `}</style>
    </div>
  );
};

export default PdfModal;
