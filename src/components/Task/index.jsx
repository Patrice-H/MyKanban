import { Draggable } from 'react-beautiful-dnd';
import MuiCard from './MuiCard';

const Task = (props) => {
  const setDashboard = props.setDashboard;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;
  const taskClass = 'task-item';

  const deleteTask = (taskId) => {
    const newTasksList = {
      ...props.dashboard.tasks,
    };
    delete newTasksList[taskId];

    const newTaskListIds = props.column.taskIds.filter((id) => id !== taskId);

    const newColumns = {
      ...props.dashboard.columns,
      [props.column.id]: {
        ...props.column,
        taskIds: newTaskListIds,
      },
    };

    const newDashboard = {
      ...props.dashboard,
      tasks: newTasksList,
      columns: newColumns,
    };

    setDashboard(newDashboard);
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? taskClass + ' dragging' : taskClass}
        >
          <MuiCard
            task={props.task}
            setEditedTask={setEditedTask}
            setInputEntry={setInputEntry}
            deleteTask={deleteTask}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
