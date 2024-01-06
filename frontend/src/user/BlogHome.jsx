import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BlogAPI.getAllBlogs(currentPage);
        setBlogs(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='container-fluid my-5'>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link to={`/blog/post/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
          >
            {index + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
