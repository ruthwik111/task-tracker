import React, { useEffect, useState } from 'react';
import { createTask, getTasks, updateTask, deleteTask } from '../api';
import './Auth.css';

const Task = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState({ title: '', description: '' });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks(token);
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTask) {
            await updateTask(editingTask._id, taskData, token);
            setEditingTask(null);
        } else {
            await createTask(taskData, token);
        }
        setTaskData({ title: '', description: '' });
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
    };

    const handleEdit = (task) => {
        setTaskData({ title: task.title, description: task.description });
        setEditingTask(task);
    };

    const handleDelete = async (id) => {
        await deleteTask(id, token);
        const fetchedTasks = await getTasks(token);
        setTasks(fetchedTasks);
    };

    return (
        <div>
            <h2>Tasks</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={taskData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Task Description"
                    value={taskData.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">{editingTask ? 'Update Task' : 'Create Task'}</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Task;
