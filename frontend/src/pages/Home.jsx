import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';
import '../static/css/MainHome.css';
import BlogList from '../blog/BlogList';
// import NotFound from '../components/NotFound';
import AlertMessage from '../components/AlertMessage';
import noData from "../static/images/no_info_found.jpg";
import UserAPI from "../user/UserAPI";
import AuthAPI from '../auth/AuthAPI';


const Home = () => {
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleCloseAlert = () => {
    setAlertMessage(null);
  }
  // console.log(BlogAPI.baseUrl);
  // console.log(AuthAPI.baseUrl);
  // console.log(UserAPI.baseUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BlogAPI.getAllTags();
        // console.log(response.data);
        setAllTags(response.data);

        if (selectedTag === null) {
          const response = await BlogAPI.getAllBlogs();
          setPrevPage(response.data.previous);
          setNextPage(response.data.next);
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

  const handlePagination = async (url) => {
    try {
      const response = await BlogAPI.getAllBlogsByUrl(url);
      setPrevPage(response.data.previous);
      setNextPage(response.data.next);
      setBlogPosts(response.data.results);
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
  }

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
        {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}

        {/* Render your blog posts based on the selected tag */}
        {(blogPosts && blogPosts.length > 0) ? (<BlogList blogs={blogPosts} />) : (<div className='container my-5 py-5 d-flex justify-content-center'>
          <img src={noData} alt='No data found' />
        </div>)}

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {prevPage ? (<li className="page-item">
              <button className="page-link" onClick={() => handlePagination(prevPage)}>Previous</button>
            </li>) : null}
            {nextPage ? (
              <li className="page-item">
                <button className="page-link" onClick={() => handlePagination(nextPage)}>Next</button>
              </li>) : null}
          </ul>
        </nav>
      </main>
    </>
  );
};

export default Home;
