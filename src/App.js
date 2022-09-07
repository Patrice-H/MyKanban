import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateTask } from './services/dbManager';
import { initialData } from './data/initialData';
import Header from './components/Header';
import Column from './components/Column';
import { getTasksList } from './services/dbManager';
import { getColumnName, getInitialDashboard } from './utils/functions';

const App = () => {
  const [dashboard, setDashboard] = useState(initialData);
  const [editedTask, setEditedTask] = useState();
  const [inputEntry, setInputEntry] = useState('');
  const [dbList, setDbList] = useState();
  const [lastTaskId, setLastTaskId] = useState();

  let dataLoaded = dbList !== undefined;

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

      for (let i = 0; i < start.taskIds.length; i++) {
        if (newTaskIds[i] !== start.taskIds[i]) {
          const id = parseInt(newTaskIds[i].split('task-')[1]);
          const title = dbList.find((task) => task.id === id).name;
          const category = getColumnName(start.id);
          const order = i + 1;
          const newList = dbList.filter((task) => task.id !== id);
          updateTask(id, title, category, order).then((data) => {
            setDbList([...newList, data.data]);
          });
        }
      }
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

    const startSrc = start.taskIds;
    const startDest = finish.taskIds;
    const finishSrc = startTaskIds;
    const finishDest = finishTaskIds;

    if (startDest.length === 0) {
      const id = parseInt(draggableId.split('task-')[1]);
      const title = dbList.find((task) => task.id === id).name;
      const category = getColumnName(finish.id);
      const order = destination.index + 1;
      const newList = dbList.filter((task) => task.id !== id);
      updateTask(id, title, category, order).then((data) => {
        setDbList([...newList, data.data]);
      });
    }

    for (let i = 0; i < finishSrc.length; i++) {
      if (finishSrc[i] !== startSrc[i]) {
        const id = parseInt(finishSrc[i].split('task-')[1]);
        const title = dbList.find((task) => task.id === id).name;
        const category = getColumnName(start.id);
        const order = i + 1;
        const newList = dbList.filter((task) => task.id !== id);
        updateTask(id, title, category, order).then((data) => {
          setDbList([...newList, data.data]);
        });
      }
    }

    for (let i = 0; i < finishDest.length; i++) {
      if (startDest.length > 0 && finishDest[i] !== startDest[i]) {
        const id = parseInt(finishDest[i].split('task-')[1]);
        const title = dbList.find((task) => task.id === id).name;
        const category = getColumnName(finish.id);
        const order = i + 1;
        const newList = dbList.filter((task) => task.id !== id);
        updateTask(id, title, category, order).then((data) => {
          setDbList([...newList, data.data]);
        });
      }
    }

    setDashboard(newDashboard);
  };

  useEffect(() => {
    if (dataLoaded === false) {
      getTasksList().then((data) => {
        setDbList(data.data);
      });
    }

    const lastId = dbList && dbList[dbList.length - 1].id;
    const initialDashboard = dbList && getInitialDashboard(dbList, initialData);
    dbList && setLastTaskId(lastId);
    dbList && setDashboard(initialDashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded]);

  return (
    <>
      <Header
        dashboard={dashboard}
        editedTask={editedTask}
        inputEntry={inputEntry}
        lastTaskId={lastTaskId}
        dbList={dbList}
        setDashboard={setDashboard}
        setEditedTask={setEditedTask}
        setInputEntry={setInputEntry}
        setLastTaskId={setLastTaskId}
        setDbList={setDbList}
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
