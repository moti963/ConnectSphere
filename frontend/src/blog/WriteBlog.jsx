import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AlertMessage from '../components/AlertMessage';
import { useNavigate } from 'react-router-dom';
import BlogAPI from './BlogAPI';
import { useSelector } from 'react-redux';

const WriteBlog = () => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('published');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [alertMessage, setAlertMessage] = useState(null);

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchData = async () => {
            const response = await BlogAPI.getAllTags();
            setAllTags(response.data);
        };

        fetchData();
        if (!isAuthenticated) {
            setAlertMessage({ type: "warning", message: "Please login to post your blogs" });
            navigate("/user/login");
        }
    }, [isAuthenticated, navigate]);

    const handleContentChange = (value) => {
        setContent(value);
    };

    const handleTagsChange = (event) => {
        const { value, checked } = event.target;

        // If checked, add the tag to the list, otherwise remove it
        const updatedTags = checked
            ? [...tags, value]
            : tags.filter(tag => tag !== value);

        setTags(updatedTags);
    };

    const handleThumbnailChange = (event) => {
        const thumbnail = event.target.files[0];
        setThumbnail(thumbnail);
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
            const response = await BlogAPI.postBlog(formData);
            // navigate(`/post/${response.data.id}`);
            setAlertMessage({ type: "success", message: "Blog created successfully." });
            console.log(response.data);
            setTitle('');
            setThumbnail(null);
            setDescription('');
            setTags([]);
            setContent('');
            event.target.reset();
        } catch (error) {
            setAlertMessage({ type: "danger", message: "Some error occured, please try again." });
            console.error('Error posting blog:', error.message);
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    }

    return (
        <div className='container-fluid my-5'>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} onClose={handleCloseAlert} />}


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
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={255}
                                required
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
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                maxLength={500}
                                required
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
                            onChange={(e) => setStatus(e.target.value)}
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
