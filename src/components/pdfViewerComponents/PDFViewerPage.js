import React from 'react';
import { useParams } from 'react-router-dom';

function PDFViewerPage () {
    const { certificateName } = useParams();
    
  return (
    <div>
        <iframe title="PDF Viewer" src={`data:application/pdf;base64,${certificateName}`} style={{ width: '100%', height: '100vh' }} />      
    </div>
  );
};

export default PDFViewerPage;
