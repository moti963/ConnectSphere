// BlogEdit.jsx
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';
import { useSelector } from 'react-redux';
import allTagsData from '../dataset/tags.json';


const UserPostEdit = ({ id }) => {
    const [blogContent, setBlogContent] = useState({
        title: '',
        thumbnail: null,
        description: '',
        content: '',
        status: 'published',
        tags: [],
    });
    const [allTags, setAllTags] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.getBlogDetails(id);
                const blogData = response.data;

                setBlogContent({
                    content: blogData.content.content,
                    title: blogData.title,
                    description: blogData.description,
                    status: blogData.status,
                    tags: blogData.tags.map(tag => tag.tag),
                });
            } catch (error) {
                console.error('Error fetching blog:', error.message);
            }
        };

        const fetchTags = async () => {
            // try {
            //     const response = await BlogAPI.getAllTags();
            //     setAllTags(response.data);
            // } catch (error) {
            //     console.error('Error fetching tags:', error.message);
            // }
            setAllTags(allTagsData);
        };

        fetchData();
        fetchTags();
        if (!isAuthenticated) {
            setAlertMessage({ type: "warning", message: "Please login to edit your post" });
        }
    }, [id, isAuthenticated]);

    const handleContentChange = (value) => {
        setBlogContent((prev) => ({
            ...prev,
            content: value,
        }));
    };

    const handleThumbnailChange = (event) => {
        const thumbnail = event.target.files[0];
        setThumbnail(thumbnail);
    };

    const handleTagsChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            // Add the tag to blogContent.tags if it doesn't already exist
            if (!blogContent.tags.includes(value)) {
                blogContent.tags.push(value);
            }
        } else {
            // Remove the tag from blogContent.tags
            const index = blogContent.tags.indexOf(value);
            if (index !== -1) {
                blogContent.tags.splice(index, 1);
            }
        }

        // Ensure immutability by creating a new array for blogContent.tags
        setBlogContent(prev => ({
            ...prev,
            tags: [...blogContent.tags]
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

        blogContent.thumbnail = thumbnail;

        if (blogContent.tags.length < 1) {
            setAlertMessage({ type: "warning", message: "Please select tags." });
            return;
        }

        try {
            const response = await BlogAPI.updateMyBlogPost(id, blogContent);
            console.log(response);
            navigate(`/post/${id}`);
            console.log(blogContent);
        } catch (error) {
            console.error('Error updating blog:', error.message);
        }
    };

    return (
        <div className='container-fluid my-5'>
            {alertMessage ? (
                <AlertMessage message={alertMessage.message} />
            ) : null}

            <h3 className='text-center rounded p-2'>Edit Blog</h3>

            <form onSubmit={handleSubmit} className='mb-3'>
                <button className='btn btn-success my-3 me-auto' type="submit">
                    Update
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
                            <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                            <input
                                type="file"
                                className="form-control"
                                id="thumbnail"
                                name="thumbnail"
                                onChange={handleThumbnailChange}
                                accept='image/*'
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
                                rows={2}
                                maxLength={500}
                            />
                        </div>
                    </div>

                    <div className="mb-3 col-md-6 p-3">
                        <label className="form-label">Select tags</label>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
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
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            [{ direction: 'rtl' }],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ color: [] }, { background: [] }],
                            [{ font: [] }],
                            [{ align: [] }],
                            ['clean'],
                            ['link', 'image'],
                        ],
                    }}
                />


            </form>
            <p className='text-bg-warning rounded p-2 m-2'><i>Note: </i>After editing the post, your post's views will be reseted</p>
        </div>
    );
};

export default UserPostEdit;
