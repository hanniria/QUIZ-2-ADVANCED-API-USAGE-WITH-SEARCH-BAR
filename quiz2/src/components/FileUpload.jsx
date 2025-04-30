import React, { useState } from 'react';

function FileUploader() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData,
      });
      alert('Upload successful!');
    } catch (err) {
      alert('Upload failed.');
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>⬆️</button>
    </div>
  );
}

export default FileUploader;
