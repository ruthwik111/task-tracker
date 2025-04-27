const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description, user: req.user.id });
    await task.save();
    res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
};
