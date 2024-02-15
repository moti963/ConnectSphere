// BlogEdit.jsx
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AlertMessage from '../components/AlertMessage';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';
import BlogAPI from './BlogAPI';
import { useSelector } from 'react-redux';

const BlogEdit = () => {
    const [blogContent, setBlogContent] = useState({
        content: '',
        title: '',
        description: '',
        status: 'published',
        tags: [],
    });
    const [allTags, setAllTags] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BlogAPI.getBlog(id);
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
            try {
                const response = await BlogAPI.getAllTags();
                setAllTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error.message);
            }
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

    const handleTagsChange = (event) => {
        const { name, value, checked } = event.target;

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

        if (blogContent.tags.length < 1) {
            setAlertMessage({ type: "warning", message: "Please select tags." });
            return;
        }

        try {
            const response = await BlogAPI.updateBlog(id, blogContent);
            setAlertMessage({ type: "success", message: "Post updated successfully." });
            if (response.data.status === 200) {
                navigate(`/blog/post/${id}`);
            }
        } catch (error) {
            console.error('Error updating blog:', error.message);
            setAlertMessage({ type: "error", message: "Some error occured!!" });
        }
    };


    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    return (
        <div className='container-fluid my-5'>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}


            <h3 className='text-bg-secondary rounded p-2'>Edit Blog</h3>

            <form onSubmit={handleSubmit} id='blogForm'>
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
        </div>
    );
};

export default BlogEdit;
