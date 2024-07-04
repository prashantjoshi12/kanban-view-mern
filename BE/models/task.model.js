const { default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    task: String,
    description: String,
    status : { type: String, enum: ['To Do', 'In Progress', 'QA', 'Done'] },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;