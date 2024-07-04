import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { Button,  Popover } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import AddTaskForm from "./AddTaskForm";

const Column = ({ column, tasks, addTask, onDelete, onUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNewTaskContent("");
    setNewTaskDescription("");
  };

  const handleAddTask = (status) => {
    if (newTaskContent.trim()) {
      addTask(newTaskContent, newTaskDescription, status);
      setNewTaskContent("");
      setNewTaskDescription("");
      handleClose();
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="column">
      <div className="column-header">
        <h2>{column.title} ({column.taskIds?.length})</h2> 
        {/* {column.id === 'column-1' && ( */}
        <div>
          <Button onClick={handleClick}>
            <AddTask />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <AddTaskForm
              addTask={addTask}
              handleClose={handleClose}
              columnTitle={column.title}
            />
          </Popover>
        </div>
        {/* )} */}
      </div>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="task-list"
          >
            { tasks && tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
            {tasks.length === 0 && (
              <div className="empty-message">No tasks in this column</div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
