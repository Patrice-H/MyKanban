import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
  const taskClass = 'task-item';

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <p
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? taskClass + ' dragging' : taskClass}
        >
          {props.task.content}
        </p>
      )}
    </Draggable>
  );
};

export default Task;
