import React, { useEffect, useState } from 'react';
import { createProject, getProjects, updateProject, deleteProject } from '../api'; // Assume these functions are defined in api.js
import './Auth.css';

const Project = ({ token }) => {
    const [projects, setProjects] = useState([]);
    const [projectData, setProjectData] = useState({ name: '', description: '' });
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            const fetchedProjects = await getProjects(token); // Assume this function is defined in api.js
            setProjects(fetchedProjects);
        };
        fetchProjects();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProject) {
            await updateProject(editingProject._id, projectData, token); // Assume this function is defined in api.js
            setEditingProject(null);
        } else {
            await createProject(projectData, token); // Assume this function is defined in api.js
        }
        setProjectData({ name: '', description: '' });
        const fetchedProjects = await getProjects(token); // Refresh the project list
        setProjects(fetchedProjects);
    };

    const handleEdit = (project) => {
        setProjectData({ name: project.name, description: project.description });
        setEditingProject(project);
    };

    const handleDelete = async (id) => {
        await deleteProject(id, token); // Assume this function is defined in api.js
        const fetchedProjects = await getProjects(token); // Refresh the project list
        setProjects(fetchedProjects);
    };

    return (
        <div>
            <h2>Projects</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={projectData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Project Description"
                    value={projectData.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingProject ? 'Update Project' : 'Create Project'}</button>
            </form>
            <ul>
                {projects.map((project) => (
                    <li key={project._id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <button onClick={() => handleEdit(project)}>Edit</button>
                        <button onClick={() => handleDelete(project._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Project;
