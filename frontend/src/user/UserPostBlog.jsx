import React, { useEffect, useState } from 'react';
import BlogAPI from '../blog/BlogAPI';
import UserPostList from './UserPostList';

const UserPostBlog = ({ blogType }) => {
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (blogType === "published") {
          const response = await BlogAPI.getMyPublishedBlogs();
          console.log(response.data);
          setBlogs(response.data);
        }
        else if (blogType === "draft") {
          const response = await BlogAPI.getMyDraftBlogs();
          setBlogs(response.data);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchBlogs();
  }, [blogType]);


  return (
    <div className='container-fluid my-5'>
      {blogs ? (<UserPostList blogs={blogs} />) : (<h3 className='text-center'>No post found!!</h3>)}
    </div >
  );
};

export default UserPostBlog;
