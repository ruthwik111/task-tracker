const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }
});

module.exports = mongoose.model('Task', taskSchema);
