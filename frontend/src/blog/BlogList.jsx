import React from 'react';
import { Link } from 'react-router-dom';
import userProfile from '../static/images/default_user.png';

const BlogList = ({ blogs }) => {
    return (
        <div className='container my-5'>
            <div className="row">
                {blogs && blogs.map(blog => (
                    <div key={blog.id} className="col-md-6 mb-4">
                        <div className="card h-100">
                            {blog.thumbnail && <img src={blog.thumbnail} className="card-img-top" alt={blog.title} style={{maxHeight: '18rem'}} />}
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/post/${blog.id}`}>{blog.title}</Link>
                                </h5>
                                <p className="card-text">{blog.description}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center">
                                <div className="author">
                                    <Link to={`/profile/${blog.username}`}>
                                        <img loading='lazy' src={blog.profile_img ? ("http://127.0.0.1:8000/" + blog.profile_img) : userProfile} alt={blog.user} className="rounded-circle img-thumbnail mb-3"
                                            style={{ maxWidth: '42px', height: 'auto' }} />
                                        <span className="ml-2">{blog.username}</span>
                                    </Link>
                                </div>
                                <small className="text-muted">{blog.created_at}</small>
                            </div>
                            <div className="card-footer bg-transparent border-top">
                                <div className="d-flex justify-content-between align-items-center">
                                    {/* <div className="meta"> */}
                                        {/* <span><i className="mx-2 icon-heart"></i>{blog.likes} Likes</span> */}
                                        {/* <span><i className="mx-2 icon-eye"></i>{blog.views} Views</span> */}
                                        {/* <span><i className="mx-2 icon-comment"></i>{blog.comments} Comments</span> */}
                                    {/* </div> */}
                                    <Link to={`/post/${blog.id}`} className="btn btn-sm btn-primary">
                                        Continue Reading
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
