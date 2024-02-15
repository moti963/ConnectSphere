import React, { useEffect, useState } from 'react';
import BlogAPI from '../blog/BlogAPI';
import UserPostList from './UserPostList';
import noData from "../static/images/no_info_found.jpg";

const UserPostBlog = ({ blogType }) => {
  const [blogs, setBlogs] = useState([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (blogType === "published") {
          const response = await BlogAPI.getMyPublishedBlogs();
          // console.log(response.data);
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
      {(blogs && blogs.length > 0) ? (<UserPostList blogs={blogs} />) : (<div className='container'>
        <img className='m-2' src={noData} alt="No data" />
        <h1 className='m-2'>{`No ${blogType} post found, Please add...`}</h1>
      </div>)}
    </div >
  );
};

export default UserPostBlog;
