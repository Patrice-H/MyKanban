import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData } from './data/initialData';
import Header from './components/Header';
import Column from './components/Column';
import { GetTasksList } from './services/TaskManager';
import { convertTasksList } from './utils/functions';

const App = () => {
  const { tasksList } = GetTasksList();
  let dataLoaded = tasksList !== undefined;

  const [dashboard, setDashboard] = useState(initialData);
  const [editedTask, setEditedTask] = useState();
  const [inputEntry, setInputEntry] = useState('');
  const [lastTaskId, setLastTaskId] = useState();

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

  useEffect(() => {
    const lastId = tasksList && tasksList[tasksList.length - 1].id;
    const tasks = tasksList && convertTasksList(tasksList);
    const columns = tasksList && {
      ...initialData.columns,
      'column-1': {
        ...initialData.columns['column-1'],
        taskIds: Object.keys(tasks),
      },
    };
    const initialDashboard = tasksList && {
      ...initialData,
      columns,
      tasks,
    };
    setLastTaskId(lastId);
    setDashboard(initialDashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded]);

  return (
    <>
      <Header
        dashboard={dashboard}
        editedTask={editedTask}
        inputEntry={inputEntry}
        lastTaskId={lastTaskId}
        setDashboard={setDashboard}
        setEditedTask={setEditedTask}
        setInputEntry={setInputEntry}
        setLastTaskId={setLastTaskId}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard">
          {dashboard &&
            dashboard.colunmOrder.map((columnId) => {
              const column = dashboard.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId) => dashboard.tasks[taskId]
              );
              return (
                <Column
                  key={column.id}
                  dashboard={dashboard}
                  column={column}
                  tasks={tasks}
                  setDashboard={setDashboard}
                  setEditedTask={setEditedTask}
                  setInputEntry={setInputEntry}
                />
              );
            })}
        </div>
      </DragDropContext>
    </>
  );
};

export default App;
