import React, { useState, useEffect } from 'react';
import UserAPI from './UserAPI';
import AlertMessage from '../components/AlertMessage';
import UserProjectForm from '../forms/UserProjectForm';

const UserProjectDisplay = () => {
    const [projects, setProjects] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isAddingNewProject, setIsAddingNewProject] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const fetchUseProjects = async () => {
        try {
            const response = await UserAPI.getUserProjects();
            setProjects(response);
        } catch (error) {
            console.log(error.message);
            setAlertMessage({ type: "danger", message: "Unable to fetch your details." });
        }
    }

    useEffect(() => { fetchUseProjects(); }, []);

    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsAddingNewProject(false);
    };

    const handleAddNewProject = () => {
        setSelectedProject(null);
        setIsAddingNewProject(true);
    };

    const handleCancelClick = () => {
        setSelectedProject(null);
        setIsAddingNewProject(false);
    }

    const handleDeleteProject = async (project) => {
        if (window.confirm("Are you sure you want to delete this Project?")) {
            try {
                // await UserAPI.deleteUserProject(Project.id);
                setProjects((prevProjects) =>
                    prevProjects.filter((p) => p.id !== project.id)
                );
                setAlertMessage({ type: "success", message: "Project deleted successfully." });
            } catch (error) {
                console.log(error.message);
                setAlertMessage({ type: "danger", message: "Unable to delete the Project." });
            }
        }
    };

    return (
        <div className="container mt-3">

            {/* Conditionally render the form for editing or adding a new Project */}
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
            {(selectedProject || isAddingNewProject) && (
                <UserProjectForm initialFormData={selectedProject} />
            )}
            {!selectedProject && !isAddingNewProject && projects ? (
                <div className="row">
                    {projects.map((project, index) => (
                        <div key={index} className="col-md-12 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <p>Project Name: {project.project_name}</p>
                                    <p>Description: {project.description}</p>
                                    <p>Start Date: {project.start_date}</p>
                                    <p>End Date: {project.end_date ? project.end_date : 'Ongoing'}</p>
                                    <p>Project Link: <a href={project.project_link} target="_blank" rel="noopener noreferrer">{project.project_link}</a></p>
                                    <button
                                        className="btn btn-sm btn-primary m-2"
                                        onClick={() => handleEditProject(project)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger m-2"
                                        onClick={() => handleDeleteProject(project)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>))}
                </div>
            ) : null}

            {/* Button to trigger adding a new Project */}
            {!isAddingNewProject && (
                <button
                    className="btn btn-sm btn-success mx-2 mt-3"
                    onClick={handleAddNewProject}
                >
                    Add New Project
                </button>
            )}
            {(selectedProject || isAddingNewProject) && (
                <button
                    className="btn btn-sm btn-secondary mx-2 mt-3"
                    onClick={handleCancelClick}
                >
                    Cancel
                </button>
            )}
        </div>
    );
};

export default UserProjectDisplay;
