import { Droppable } from 'react-beautiful-dnd';
import { Paper } from '@mui/material';
import Task from '../Task';
import './Column.css';

const Column = (props) => {
  const tasksListClass = 'tasks-list';

  return (
    <Paper
      className="column"
      id={`${props.column.title.replace(/ /g, '-').toLowerCase()}-column`}
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
                  setEditedTask={props.setEditedTask}
                  column={props.column}
                  task={task}
                  index={index}
                  setInputEntry={props.setInputEntry}
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