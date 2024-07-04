import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

const EditTaskForm = ({ task, onUpdate, handleClose }) => {
  const [editedContent, setEditedContent] = useState(task.content);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSaveEdit = () => {
    onUpdate(task.id, editedContent, editedDescription);
    handleClose();
  };

  const handleCancelEdit = () => {
    handleClose();
  };

  return (
    <div style={{ width: '100%' , padding: '16px'}}>
      <TextField
        style={{width: '90%'}}
        label="Task"
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
      style={{width: '90%'}}
        label="Description"
        multiline
        rows={4}
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button onClick={handleSaveEdit} variant="contained" color="primary" style={{ marginRight: '8px' }}>Save</Button>
      <Button onClick={handleCancelEdit} variant="contained">Cancel</Button>
    </div>
  );
};

export default EditTaskForm;
