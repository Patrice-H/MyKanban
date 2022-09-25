import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  getTasksList,
  getCategoriesList,
  updateTask,
} from '../../services/dbManager';
import { initialData } from '../../data/initialData';
import Snackbar from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';
import Header from '../../components/Header';
import Column from '../../components/Column';
import { getCategoryId, getInitialDashboard } from '../../utils/functions';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState();
  const [editedTask, setEditedTask] = useState();
  const [inputEntry, setInputEntry] = useState('');
  const [dbList, setDbList] = useState();
  const [categories, setCategories] = useState();
  const [message, setMessage] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const param = useParams();
  const dashboardId = parseInt(param.dashboardId);

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
          const categoryId = getCategoryId(start.id, categories);
          const order = i + 1;
          updateTask(id, title, order, categoryId, dashboardId).then((data) => {
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
      const categoryId = getCategoryId(finish.id, categories);
      const order = destination.index + 1;
      updateTask(id, title, order, categoryId, dashboardId).then((data) => {
        setMessage(data.message);
      });
    }

    for (let i = 0; i < startTaskIds.length; i++) {
      if (startTaskIds[i] !== start.taskIds[i]) {
        const id = parseInt(startTaskIds[i].split('task-')[1]);
        const title = dashboard.tasks[startTaskIds[i]].title;
        const categoryId = getCategoryId(start.id, categories);
        const order = i + 1;
        updateTask(id, title, order, categoryId, dashboardId).then((data) => {
          setMessage(data.message);
        });
      }
    }

    for (let i = 0; i < finishTaskIds.length; i++) {
      if (finish.taskIds.length > 0 && finishTaskIds[i] !== finish.taskIds[i]) {
        const id = parseInt(finishTaskIds[i].split('task-')[1]);
        const title = dashboard.tasks[finishTaskIds[i]].title;
        const categoryId = getCategoryId(finish.id, categories);
        const order = getOrder(finishTaskIds, finishTaskIds[i]);
        updateTask(id, title, order, categoryId, dashboardId).then((data) => {
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
      getCategoriesList().then((data) => {
        setCategories(
          data.data.filter((category) => category.dashboard_id === dashboardId)
        );
      });

      getTasksList().then((data) => {
        const tasksList = data.data.filter(
          (task) => task.dashboard_id === dashboardId
        );
        setDbList(tasksList);
      });
    }

    const initialDashboard =
      categories &&
      dbList &&
      getInitialDashboard(categories, dbList, initialData);
    categories && dbList && setDashboard(initialDashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded]);

  return (
    <>
      <Header
        dashboardId={dashboardId}
        dashboard={dashboard}
        editedTask={editedTask}
        inputEntry={inputEntry}
        message={message}
        categories={categories}
        setDashboard={setDashboard}
        setEditedTask={setEditedTask}
        setInputEntry={setInputEntry}
        setMessage={setMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dashboard">
          {dashboard &&
            dashboard.columnOrder.map((columnId) => {
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
                  categories={categories}
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

export default Dashboard;
