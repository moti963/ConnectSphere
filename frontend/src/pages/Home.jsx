import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';
import '../static/css/MainHome.css';
import BlogList from '../blog/BlogList';
import NotFound from '../components/NotFound';


const Home = () => {
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BlogAPI.getAllTags();
        // console.log(response.data);
        setAllTags(response.data);

        if (selectedTag === null) {
          const response = await BlogAPI.getAllBlogs();
          setBlogPosts(response.data.results);
        }
      } catch (error) {
        console.error('Error fetching tags:', error.message);
      }
    };

    fetchData();
  }, [navigate, selectedTag]);

  const handleTagClick = async (tag) => {
    try {
      const response = await BlogAPI.getBlogByTag(tag.tag);
      setBlogPosts(response.data.results);
      setSelectedTag(tag.tag);
      // console.log(response)
    } catch (error) {
      console.error('Error fetching blog posts:', error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== '') {
      try {
        const response = await BlogAPI.searchBlogs(trimmedQuery);
        setBlogPosts(response.data.results);
        setSelectedTag("search");
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      }
    }
  };

  return (
    <>

      <header className="navbar navbar-expand-lg bg-body-tertiary bg-dark p-2 d-flex" data-bs-theme="dark">
        <form className="d-flex align-items-center">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
            Search
          </button>
        </form>
        <div className="nav-underline d-flex scrollmenu">
          <span
            className={`mx-2 btn nav-item nav-link link-primary ${selectedTag === null ? 'active' : ''}`}
            onClick={() => handleTagClick({ tag: null })}
          >
            Blogs
          </span>
          {allTags &&
            allTags.map((tag, index) => (
              <span
                key={index}
                className={`mx-2 btn nav-item nav-link link-primary ${selectedTag === tag.tag ? 'active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.tag}
              </span>
            ))}
        </div>
      </header>

      <main className="container">
        {/* Render your blog posts based on the selected tag */}
        {blogPosts ? (<BlogList blogs={blogPosts} />) : (<NotFound />)}
      </main>
    </>
  );
};

export default Home;
