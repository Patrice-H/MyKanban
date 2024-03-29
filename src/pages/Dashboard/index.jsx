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
import Loader from '../../components/Loader';
import { getCategoryId, getInitialDashboard } from '../../utils/functions';
import './Dashboard.css';
import TaskModal from '../../components/TaskModal';

/**
 * Dashboard page component
 *
 * @description The above code is a React component that is used to display a dashboard.
 * @param {object} props The props component
 * @returns {JSX} The React component.
 */
const Dashboard = (props) => {
  const [message, setMessage] = useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    id: '',
    inputEntry: {
      title: '',
      description: '',
    },
    inputError: false,
  });
  const setDashboard = props.setDashboard;
  const setDbData = props.setDbData;
  const setModalType = props.setModalType;
  const param = useParams();
  const dashboardId = parseInt(param.dashboardId);

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

    const start = props.dashboard.columns[source.droppableId];
    const finish = props.dashboard.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newDashboard = {
        ...props.dashboard,
        columns: {
          ...props.dashboard.columns,
          [newColumn.id]: newColumn,
        },
      };

      for (let i = 0; i < start.taskIds.length; i++) {
        if (newTaskIds[i] !== start.taskIds[i]) {
          const id = parseInt(newTaskIds[i].split('task-')[1]);
          const title = props.dashboard.tasks[newTaskIds[i]].title;
          const categoryId = getCategoryId(start.id, props.dbData.categories);
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
      ...props.dashboard,
      columns: {
        ...props.dashboard.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    if (finish.taskIds.length === 0) {
      const id = parseInt(draggableId.split('task-')[1]);
      const title = props.dashboard.tasks[draggableId].title;
      const categoryId = getCategoryId(finish.id, props.dbData.categories);
      const order = destination.index + 1;
      updateTask(id, title, order, categoryId, dashboardId).then((data) => {
        setMessage(data.message);
      });
    }

    for (let i = 0; i < startTaskIds.length; i++) {
      if (startTaskIds[i] !== start.taskIds[i]) {
        const id = parseInt(startTaskIds[i].split('task-')[1]);
        const title = props.dashboard.tasks[startTaskIds[i]].title;
        const categoryId = getCategoryId(start.id, props.dbData.categories);
        const order = i + 1;
        updateTask(id, title, order, categoryId, dashboardId).then((data) => {
          setMessage(data.message);
        });
      }
    }

    for (let i = 0; i < finishTaskIds.length; i++) {
      if (finish.taskIds.length > 0 && finishTaskIds[i] !== finish.taskIds[i]) {
        const id = parseInt(finishTaskIds[i].split('task-')[1]);
        const title = props.dashboard.tasks[finishTaskIds[i]].title;
        const categoryId = getCategoryId(finish.id, props.dbData.categories);
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

  /**
   * Function to get all data from a dashboard
   *
   * @async
   * @description It get all the categories and tasks from the database and set them to the state.
   */
  const getAllData = async () => {
    let categories, tasks;
    await getCategoriesList().then((data) => {
      categories = data.data.filter(
        (category) => category.dashboard_id === dashboardId
      );
    });
    await getTasksList().then((data) => {
      tasks = data.data.filter((task) => task.dashboard_id === dashboardId);
    });
    setDbData({
      ...props.dbData,
      categories,
      tasks,
    });
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initialDashboard = getInitialDashboard(props.dbData, initialData);
    setDashboard(initialDashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dbData]);

  return (
    <>
      <Header
        dashboardId={dashboardId}
        dashboard={props.dashboard}
        message={message}
        categories={props.dbData.categories}
        setDashboard={setDashboard}
        setMessage={setMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
        setModalType={setModalType}
      />
      {props.dbData.categories.length > 0 ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="dashboard">
              {props.dashboard &&
                props.dashboard.columnOrder.map((columnId) => {
                  const column = props.dashboard.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => props.dashboard.tasks[taskId]
                  );
                  return (
                    <Column
                      key={column.id}
                      dashboard={props.dashboard}
                      column={column}
                      tasks={tasks}
                      categories={props.dbData.categories}
                      setDashboard={setDashboard}
                      setMessage={setMessage}
                      setIsSnackbarOpen={setIsSnackbarOpen}
                      setTaskForm={setTaskForm}
                      setModalType={setModalType}
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
      ) : (
        <div className="dashboard">
          <Loader />
        </div>
      )}
      <TaskModal
        taskForm={taskForm}
        modalType={props.modalType}
        dashboard={props.dashboard}
        dashboardId={dashboardId}
        categories={props.dbData.categories}
        setTaskForm={setTaskForm}
        setModalType={setModalType}
        setDashboard={setDashboard}
        setMessage={setMessage}
        setIsSnackbarOpen={setIsSnackbarOpen}
      />
    </>
  );
};

export default Dashboard;
