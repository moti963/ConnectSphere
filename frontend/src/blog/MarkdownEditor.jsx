// MarkdownEditor.js
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('# Write your Markdown here');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [posts, setPosts] = useState([]);


  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Create a preview URL for the selected image
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', 'Your Title');
    formData.append('content', markdown);
    formData.append('image', imageFile);

    // Send a POST request with the FormData to save the Markdown content and image to the Django backend
    fetch('http://localhost:8000/api/blog/posts/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setMarkdown('# Write your Markdown here');
        setImageFile(null);
        setImagePreview(null);
      })
      .catch((error) => console.error('Error saving post:', error));
  };

  return (
    <div>

      <div className='container-fluid my-5 p-3 d-flex'>
        <form onSubmit={handleSubmit} className='form col-md-5 p-2'>
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            rows={10}
            cols={50}
            className='form-control'
          />
          <input className='form-control my-1' type="file" accept="image/*" onChange={handleFileChange} />

          <button className='btn btn-success' type="submit">Save Post</button>
        </form>
        <div className='col-md-5 p-2'>
          <h2>Preview</h2>
          <ReactMarkdown>{markdown}</ReactMarkdown>
          {imagePreview && (
            <div className='ml-auto p-4'>
              <h3>Selected Image Preview</h3>
              <img
                src={imagePreview}
                alt="Selected"
                style={{ maxWidth: '100%' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
