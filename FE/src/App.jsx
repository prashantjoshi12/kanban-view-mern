import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css"; 
import {
  addTaskAPI,
  deleteTaskAPI,
  fetchTasksAPI,
  updateTaskAPI,
  updateTaskStatusAPI,
} from "./api";

function App() {
  const [state, setState] = useState({
    tasks: {},
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "QA", taskIds: [] },
      "column-4": { id: "column-4", title: "Done", taskIds: [] },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  });

  const addTask = async (taskContent, description , status) => {
    await addTaskAPI(taskContent, description , status).then(() => fetchData()).catch((error) => {
      console.error("Error adding task:", error);
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetchTasksAPI();
      if (!response) {
        throw new Error("Network response was not ok");
      }
      const result = response;
      const tasks = {};
      result.forEach((item) => {
        tasks[item._id] = {
          id: item._id,
          content: item.task,
          description: item.description,
        };
      });

      const columns = {
        "column-1": {
          id: "column-1",
          title: "To Do",
          taskIds: result
            .filter((item) => item.status === "To Do")
            .map((item) => item._id),
        },
        "column-2": {
          id: "column-2",
          title: "In Progress",
          taskIds: result
            .filter((item) => item.status === "In Progress")
            .map((item) => item._id),
        },
        "column-3": {
          id: "column-3",
          title: "QA",
          taskIds: result
            .filter((item) => item.status === "QA")
            .map((item) => item._id),
        },
        "column-4": {
          id: "column-4",
          title: "Done",
          taskIds: result
            .filter((item) => item.status === "Done")
            .map((item) => item._id),
        },
      };

      setState({
        tasks,
        columns,
        columnOrder: ["column-1", "column-2", "column-3", "column-4"],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    await updateTaskStatusAPI(taskId, newStatus)
      .then()
      .catch((error) => console.error("Error updating task status:", error));
  };

  const onDelete = async (taskId) => {
    await deleteTaskAPI(taskId)
      .then(() => fetchData())
      .catch((error) => console.error("Error deleting task:", error));
  };

  const onUpdate = async (taskId, newContent, newDescription) => {
    await updateTaskAPI(taskId, newContent, newDescription)
      .then(() => fetchData())
      .catch((error) => console.error("Error updating task:", error));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
    updateTaskStatus(draggableId, finish.title);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              addTask={addTask}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
export default App;
