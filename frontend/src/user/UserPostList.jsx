import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';
import UserPostEdit from './UserPostEdit';

const UserPostList = ({ blogs }) => {
    const [editPost, setEditPost] = useState(null);

    const handleDeletePost = async (id) => {
        try {
            const response = await BlogAPI.deleteMyBlogPost(id);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(blogs);

    const handleEditPost = (id) => {
        setEditPost(id);
    };

    const handleCancelEdit = () => {
        setEditPost(null);
    };

    console.log(editPost);

    return (
        <div className='container my-5'>
            <div className="row">
                {!editPost && blogs ? (blogs.map(blog => (
                    <div key={blog.id} className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/post/${blog.id}`}>{blog.title}</Link>
                                </h5>
                                <p className="card-text">{blog.description}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <small className="text-muted">{blog.created_at}</small>
                            </div>
                            <div className="card-footer bg-transparent border-top">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="meta">
                                        {/* <span><i className="mx-2 icon-heart"></i>{0} Likes</span> */}
                                        <span className='m-1'>Views: <i className="mx-2 icon-eye"></i>{blog.views}</span>
                                        {/* <span className='m-1'>Status: <i className="mx-2 icon-eye"></i>{blog.status}</span> */}
                                        {/* <span><i className="mx-2 icon-comment"></i>{0} Comments</span> */}
                                    </div>
                                    <Link to={`/post/${blog.id}`} className="btn btn-sm btn-primary">
                                        Continue Reading
                                    </Link>
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleEditPost(blog.id)}>
                                        Edit
                                    </button>
                                    <button type='button' className="btn btn-sm btn-danger" onClick={() => handleDeletePost(blog.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : (<h1 className='text-center'>No post found!!</h1>)}
            </div>
            {editPost ? (<UserPostEdit id={editPost} />) : (null)}
            {editPost ? (<button className="btn btn-sm btn-secondary" onClick={() => handleCancelEdit()}>
                Cancel
            </button>) : (null)}
        </div>
    );
};

export default UserPostList;
