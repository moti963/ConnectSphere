import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';
import BlogAPI from '../blog/BlogAPI';
import { useSelector } from 'react-redux';
import allTagsData from '../dataset/tags.json';

const UserPostEdit = ({ id }) => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('published');
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.getBlogDetails(id);
                const blogData = response.data;

                setTitle(blogData.title);
                setDescription(blogData.description);
                setContent(blogData.content.content);
                setStatus(blogData.status);
                setTags(blogData.tags.map(tag => tag.tag));
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
        setContent(value);
    };

    const handleThumbnailChange = (event) => {
        const thumbnail = event.target.files[0];
        setThumbnail(thumbnail);
    };

    const handleTagsChange = (event) => {
        const { value, checked } = event.target;

        const updatedTags = checked
            ? [...tags, value]
            : tags.filter(tag => tag !== value);

        setTags(updatedTags);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') setTitle(value);
        else if (name === 'description') setDescription(value);
        else if (name === 'status') setStatus(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (tags.length < 1) {
            setAlertMessage({ type: "warning", message: "Please select tags." });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }
        formData.append('description', description);
        formData.append('status', status);
        formData.append('content', content);
        tags.forEach(tag => formData.append('tags', tag));

        try {
            const response = await BlogAPI.updateMyBlogPost(id, formData);
            console.log(response);
            navigate(`/post/${id}`);
            console.log(formData);
        } catch (error) {
            console.error('Error updating blog:', error.message);
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    return (
        <div className='container-fluid my-5'>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}


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
                                value={title}
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
                                value={description}
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
                                            checked={tags.includes(tag.tag)}
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
                            value={status}
                            onChange={handleChange}
                        >
                            <option value="published">Publish</option>
                            <option value="draft">Make draft</option>
                        </select>
                    </div>
                </div>

                <ReactQuill
                    value={content}
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
            <p className='text-bg-warning rounded p-2 m-2'><i>Note: </i>After editing the post, your post's views will be reset</p>
        </div>
    );
};

export default UserPostEdit;
