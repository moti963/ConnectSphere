// BlogPost.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogAPI from './BlogAPI';
import NotFound from '../components/NotFound';
// import AlertMessage from '../components/AlertMessage';
import { Link } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await BlogAPI.getBlogDetails(id);
                // console.log(response.data);
                setBlog(response.data);
            } catch (error) {
                // Handle error (e.g., redirect to a 404 page)
                console.error('Error fetching blog post:', error.message);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        // Render loading state or redirect to a 404 page
        return <NotFound />;
    }


    return (
        <div className="container my-5">
            <h2>{blog.title}</h2>
            <p className="text-muted">By <Link to={`/profile/${blog.username}`}>{blog.username}</Link> | {blog.created_at}</p>
            {/* <p className="text-muted">Views: {blog.views}</p> */}
            {blog.thumbnail && ( <img loading='lazy' className='my-2' src={"http://127.0.0.1:8000" + blog.thumbnail} alt="thumbnail" />)}
            <p>{blog.description}</p>
            <p>{blog.tags.map(tag => <button key={tag.id} className="btn btn-info m-2">{tag.tag}</button>)}</p>
            <hr />

            <div dangerouslySetInnerHTML={{ __html: blog.content.content }} />

            {/* Add more details as needed (e.g., views, status, etc.) */}
        </div>
    );
};

export default BlogPost;
