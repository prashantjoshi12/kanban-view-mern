const Todo = require("../models/task.model");

const getTodoService = async (param,) => {
    try {
        const todos = await Todo.find();
        return todos;
    } catch (error) {
        console.log(error);
        return error
    }
}

const addTaskService = (body) => {
    try {
        const todo = new Todo(body);
        const res = todo.save();
        return res;
    } catch (error) {
        console.log(error);
        return error
    }
}

const updateTaskService = async (body, id) => {
    console.log(body, id);
    try {
        await Todo.findByIdAndUpdate(id, body).then(() => {
            console.log("task updated");
        })
        return { message: "task updated" };
    } catch (error) {
        console.log(error);
        return error
    }
}

const deleteTaskService = async (id) => {
    try {
        const res = await Todo.findByIdAndDelete(id);
        console.log(res);
        if (res) {
            return { message: "task deleted" }
        } else {
            return { message: "task not found" }
        }
    } catch (error) {
        console.log(error);
        return error
    }
}

const getSingleTaskService = async (id) => {
    try {
        const res = await Todo.findById(id);
        return res
    } catch (error) {
        console.log(error);
        return error
    }
}

module.exports = {
    getTodoService,
    addTaskService,
    updateTaskService,
    deleteTaskService,
    getSingleTaskService
}