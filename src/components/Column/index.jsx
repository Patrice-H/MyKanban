import { Droppable } from 'react-beautiful-dnd';
import { Paper } from '@mui/material';
import Task from '../Task';
import './Column.css';

const Column = (props) => {
  const tasksListClass = 'tasks-list';

  return (
    <Paper
      className="column"
      data-testid="column"
      style={{ backgroundColor: props.column.backgroundColor }}
    >
      <h2>{props.column.title}</h2>
      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              snapshot.isDraggingOver
                ? tasksListClass + ' dragging-over'
                : tasksListClass
            }
          >
            {props.tasks &&
              props.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  dashboard={props.dashboard}
                  setDashboard={props.setDashboard}
                  column={props.column}
                  categories={props.categories}
                  task={task}
                  index={index}
                  setMessage={props.setMessage}
                  setIsSnackbarOpen={props.setIsSnackbarOpen}
                  setTaskForm={props.setTaskForm}
                  setModalType={props.setModalType}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
