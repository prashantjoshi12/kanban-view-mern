import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const AddTaskForm = ({ addTask, handleClose, columnTitle }) => {
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      addTask(newTaskContent, newTaskDescription, columnTitle);
      setNewTaskContent('');
      setNewTaskDescription('');
      handleClose();
    }
  };

  return (
    <div style={{ padding: '16px', width: '300px' }}>
      <TextField
        label="New Task"
        value={newTaskContent}
        onChange={(e) => setNewTaskContent(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Description"
        multiline
        rows={4}
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <Button
        variant="contained"
        onClick={handleAddTask}
        style={{ marginTop: '16px' }}
        fullWidth
      >
        Add Task
      </Button>
    </div>
  );
};

export default AddTaskForm;
