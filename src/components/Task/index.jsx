import { Draggable } from 'react-beautiful-dnd';
import { removeTask, updateTask } from '../../services/dbManager';
import { getCategoryId } from '../../utils/functions';
import MuiCard from './MuiCard';

const Task = (props) => {
  const setDashboard = props.setDashboard;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;
  const setMessage = props.setMessage;
  const setIsSnackbarOpen = props.setIsSnackbarOpen;
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

    removeTask(parseInt(taskId.split('task-')[1])).then((data) => {
      setMessage(data.message);
      setIsSnackbarOpen(true);
    });

    for (let i = 0; i < newTaskListIds.length; i++) {
      if (newTaskListIds[i] !== props.column.taskIds[i]) {
        const id = parseInt(newTaskListIds[i].split('task-')[1]);
        const title = props.dashboard.tasks[newTaskListIds[i]].title;
        const categoryId = getCategoryId(props.column.id, props.categories);
        const order = i + 1;
        updateTask(id, title, order, categoryId, props.dashboardId);
      }
    }

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
