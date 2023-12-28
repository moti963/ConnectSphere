import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';

const Home = () => {
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BlogAPI.getAllTags();
        setAllTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error.message);
      }
    };

    fetchData();
  }, [navigate]);

  const handleTagClick = async (tag) => {
    try {
      const response = await BlogAPI.getBlogPostsByTag(tag.tag);
      setBlogPosts(response.data);
      setSelectedTag(tag.tag);
    } catch (error) {
      console.error('Error fetching blog posts:', error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div className="container-fluid">
            <div className="nav nav-underline d-flex">
              {allTags &&
                allTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`mx-2 btn nav-item nav-link link-primary ${selectedTag === tag.tag ? 'active' : ''}`}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag.tag}
                  </button>
                ))}
            </div>
          </div>
        </nav>
      </div>
      <main className="container">
        <h1>Here we'll render blogs/posts for {selectedTag}</h1>
        {/* Render your blog posts based on the selected tag */}
        {blogPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
