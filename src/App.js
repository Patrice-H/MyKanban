import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData } from './data/initialData';
import Header from './components/Header';
import Column from './components/Column';

const App = () => {
  const [dashboard, setDashboard] = useState(initialData);

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

    const start = dashboard.columns[source.droppableId];
    const finish = dashboard.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newDashboard = {
        ...dashboard,
        columns: {
          ...dashboard.columns,
          [newColumn.id]: newColumn,
        },
      };

      setDashboard(newDashboard);
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

    const newDashboard = {
      ...dashboard,
      columns: {
        ...dashboard.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setDashboard(newDashboard);
  };

  return (
    <>
      <Header dashboard={dashboard} setDashboard={setDashboard} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard">
          {dashboard.colunmOrder.map((columnId) => {
            const column = dashboard.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => dashboard.tasks[taskId]
            );

            return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </div>
      </DragDropContext>
    </>
  );

  /*
  return dashboard.colunmOrder.map((columnId) => {
    const column = dashboard.columns[columnId];
    const tasks = column.taskIds.map((taskId) => dashboard.tasks[taskId]);

    return <Column key={column.id} column={column} tasks={tasks} />;
  });*/
};

export default App;
