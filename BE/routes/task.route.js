const { getTodo, addTask, updateTask, deleteTask, getSingleTask } = require("../controllers/task.controller");
const {  addSchema } = require("../validation/task.validation");
const router = require("express").Router();

router.get("/",  getTodo)

router.post("/", addSchema , addTask)

router.put("/:id" , updateTask)

router.delete("/:id" , deleteTask)

router.get("/:id" , getSingleTask)


module.exports = router