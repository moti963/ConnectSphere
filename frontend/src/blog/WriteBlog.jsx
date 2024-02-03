// MarkdownEditor.js
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';
import BlogAPI from './BlogAPI';
import { useSelector } from 'react-redux';
import allTagsData from '../dataset/tags.json';

const WriteBlog = () => {

    const [blogContent, setBlogContent] = useState({
        content: '',
        title: '',
        description: '',
        status: 'published',
        tags: [],  // assuming tags is an array of tag names
    });
    const [allTags, setAllTags] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchData = async () => {
            // if (isAuthenticated) {
            // try {
            //     const response = await BlogAPI.getAllTags();
            //     // console.log(response.data);
            //     // console.log(response);
            //     setAllTags(response.data);
            // } catch (error) {
            //     console.error('Error fetching tags:', error.message);
            // }
            // }
            setAllTags(allTagsData);
        };

        fetchData();
        if (!isAuthenticated) {
            setAlertMessage({ type: "warning", message: "Please login to post your blogs" });
        }
    }, [isAuthenticated]);

    const handleContentChange = (value) => {
        setBlogContent((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const handleTagsChange = (event) => {
        const { name, value, checked } = event.target;

        // Use a Set to handle unique tags efficiently
        const updatedTags = new Set(blogContent.tags);

        if (checked) {
            updatedTags.add(value);
        } else {
            updatedTags.delete(value);
        }

        setBlogContent((prev) => ({
            ...prev,
            [name]: Array.from(updatedTags),
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setBlogContent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(blogContent);
        return;

        // if (blogContent.tags.length < 1) {
        //     setAlertMessage({ type: "warning", message: "Please select tags." });
        //     // console.log("Hello");
        //     return;
        // }

        // try {
        //     // console.log(blogContent);
        //     const response = await BlogAPI.postBlog(blogContent);
        //     // console.log(response);
        //     // // Optionally, you can redirect the user to the newly created blog page
        //     if (response.data.status === 201) {
        //         navigate(`/blog/post/${response.data.id}`);
        //     }
        // } catch (error) {
        //     console.error('Error posting blog:', error.message);
        // }
    };

    return (
        <div className='container-fluid my-5'>
            {alertMessage ? (
                <AlertMessage message={alertMessage.message} />
            ) : null}

            <h3 className='text-bg-secondary rounded p-2'>New Blog</h3>

            <form onSubmit={handleSubmit}>
                <button className='btn btn-success my-3 me-auto' type="submit">
                    Publish
                </button>
                <div className='d-flex justify-content-between align-items-center flex-wrap'>
                    <div className='col-md-6 p-3'>
                        <div className="mb-2">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={blogContent.title}
                                onChange={handleChange}
                                required
                                maxLength={255}
                            />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={blogContent.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                maxLength={500}
                            />
                        </div>
                    </div>

                    <div className="mb-3 col-md-6 p-3">
                        <label className="form-label">Select tags</label>
                        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                            {allTags &&
                                allTags.map((tag) => (
                                    <div className="form-check" key={tag.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={tag.id}
                                            name="tags"
                                            value={tag.tag}
                                            checked={blogContent.tags.includes(tag.tag)}
                                            onChange={handleTagsChange}
                                        />
                                        <label className="form-check-label" htmlFor={tag.id}>
                                            {tag.tag}
                                        </label>
                                    </div>
                                ))}
                        </div>

                        <select
                            className='form-control my-2'
                            name="status"
                            id="status"
                            value={blogContent.status}
                            onChange={handleChange}
                        >
                            <option value="published">Publish</option>
                            <option value="draft">Make draft</option>
                        </select>

                    </div>
                </div>

                <ReactQuill
                    value={blogContent.content}
                    name="content"
                    className='shadow form-control p-2'
                    onChange={handleContentChange}
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                            ['blockquote', 'code-block'],

                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                            [{ direction: 'rtl' }], // text direction

                            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],

                            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                            [{ font: [] }],
                            [{ align: [] }],

                            ['clean'], // remove formatting button

                            ['link', 'image'], // link and image, video
                        ],
                    }}
                />
            </form>
        </div>
    );
};

export default WriteBlog;
