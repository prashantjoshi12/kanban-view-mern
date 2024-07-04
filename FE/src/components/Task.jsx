import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { IconButton, Menu, MenuItem, Popover } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditTaskForm from './EditTaskForm';

function Task({ task, index, onDelete, onUpdate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editAnchorEl, setEditAnchorEl] = useState(null);

  const handleEditClick = (event) => {
    setEditAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setEditAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete(task.id);
    handleClose();
  };

  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="task-container"
          style={provided.draggableProps.style}
        >
          <div className="task-header">
            <h3 title={task?.content} className="task-title">{task?.content}</h3>
            <IconButton
              aria-label="more"
              aria-controls="task-actions"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              size="large"
              className="task-menu-button"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="task-actions"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleEditClick}>
                <IconButton aria-label="edit" size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                Delete
              </MenuItem>
            </Menu>
            <Popover
              open={Boolean(editAnchorEl)}
              anchorEl={editAnchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <EditTaskForm task={task} onUpdate={onUpdate} handleClose={handleClose} />
            </Popover>
          </div>
          <p className="task-description" dangerouslySetInnerHTML={{ __html: task?.description.replace(/\n/g, '<br>') }}></p>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
