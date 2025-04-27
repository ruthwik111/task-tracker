const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const project = new Project({ name, description, user: req.user.id });
    await project.save();
    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const project = await Project.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(project);
};

exports.deleteProject = async (req, res) => {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(204).send();
};