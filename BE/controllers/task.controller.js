const { getTodoService, addTaskService, updateTaskService, deleteTaskService, getSingleTaskService } = require("../services/task.service");

const getTodo = async (req, res) => {
    const param = req.params
    const todos = await getTodoService(param);
    res.status(200).json(todos);
};


const addTask = async (req, res) => {
    const body = req.body
    const result = await addTaskService(body);
    res.status(200).json(result)

}

const updateTask = async (req, res) => {
    const body = req.body
    const id = req.params.id
    const result = await updateTaskService(body, id);
    res.status(200).json(result)
}

const deleteTask = async (req, res) => {
    const id = req.params.id
    console.log(id);
    const result = await deleteTaskService(id);
    res.status(200).json(result)
}

const getSingleTask = async (req, res) => {
    const id = req.params.id
    const result = await getSingleTaskService(id);
    res.status(200).json(result)
}

module.exports = {
    getTodo,
    addTask,
    updateTask,
    deleteTask,
    getSingleTask
}