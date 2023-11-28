import React, { useEffect, useRef } from 'react';

const PdfViewer = ({ base64String }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!base64String) {
      console.error('Invalid base64 string:', base64String);
      return;
    }

    const binaryData = atob(base64String);
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const dataUrl = URL.createObjectURL(blob);

    if (iframeRef.current) {
      iframeRef.current.src = dataUrl;
    }
  }, [base64String]);

  return (
    <div>
      <iframe title="PDF Viewer" ref={iframeRef} width="100%" height="600px" />
    </div>
  );
};

export default PdfViewer;
