import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateTask } from './services/dbManager';
import { initialData } from './data/initialData';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
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
  const [message, setMessage] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  let dataLoaded = dbList !== undefined;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const getOrder = (list, task) => {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === task) {
          return i + 1;
        }
      }
    };

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
          const title = dashboard.tasks[newTaskIds[i]].title;
          const category = getColumnName(start.id);
          const order = i + 1;
          updateTask(id, title, category, order).then((data) => {
            setMessage(data.message);
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

    if (finish.taskIds.length === 0) {
      const id = parseInt(draggableId.split('task-')[1]);
      const title = dashboard.tasks[draggableId].title;
      const category = getColumnName(finish.id);
      const order = destination.index + 1;
      updateTask(id, title, category, order).then((data) => {
        setMessage(data.message);
      });
    }

    for (let i = 0; i < startTaskIds.length; i++) {
      if (startTaskIds[i] !== start.taskIds[i]) {
        const id = parseInt(startTaskIds[i].split('task-')[1]);
        const title = dashboard.tasks[startTaskIds[i]].title;
        const category = getColumnName(start.id);
        const order = i + 1;
        updateTask(id, title, category, order).then((data) => {
          setMessage(data.message);
        });
      }
    }

    for (let i = 0; i < finishTaskIds.length; i++) {
      if (finish.taskIds.length > 0 && finishTaskIds[i] !== finish.taskIds[i]) {
        const id = parseInt(finishTaskIds[i].split('task-')[1]);
        const title = dashboard.tasks[finishTaskIds[i]].title;
        const category = getColumnName(finish.id);
        const order = getOrder(finishTaskIds, finishTaskIds[i]);
        updateTask(id, title, category, order).then((data) => {
          setMessage(data.message);
        });
      }
    }

    setDashboard(newDashboard);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setIsSnackbarOpen(false)}
      >
        X
      </IconButton>
    </>
  );

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
        message={message}
        setDashboard={setDashboard}
        setEditedTask={setEditedTask}
        setInputEntry={setInputEntry}
        setLastTaskId={setLastTaskId}
        setMessage={setMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
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
                  setMessage={setMessage}
                  setIsSnackbarOpen={setIsSnackbarOpen}
                />
              );
            })}
        </div>
      </DragDropContext>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={isSnackbarOpen}
        onClose={() => setIsSnackbarOpen(false)}
        autoHideDuration={2000}
        message={message}
        action={action}
      />
    </>
  );
};

export default App;
