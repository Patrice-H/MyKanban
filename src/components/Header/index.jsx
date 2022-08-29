import { useState } from 'react';
import MuiButton from './MuiButton';
import MuiHeading1 from './MuiHeading1';
import MuiTextField from './MuiTextField';

const Header = (props) => {
  const [inputError, setInputError] = useState(false);
  const setDashboard = props.setDashboard;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;

  const addTask = () => {
    const newTask = document.getElementById('input-field').value;
    const tasksListCount = Object.keys(props.dashboard.tasks).length;
    const newTaskId = 'task-' + (tasksListCount + 1);

    if (newTask === '') {
      setInputError(true);
      return;
    }

    const newTasksList = {
      ...props.dashboard.tasks,
      [newTaskId]: {
        id: newTaskId,
        content: newTask,
      },
    };

    const newTaskListIds = Array.from(
      props.dashboard.columns['column-1'].taskIds
    );
    newTaskListIds.splice(tasksListCount, 0, newTaskId);

    const newColumns = {
      ...props.dashboard.columns,
      'column-1': {
        ...props.dashboard.columns['column-1'],
        taskIds: newTaskListIds,
      },
    };

    const newDashboard = {
      ...props.dashboard,
      tasks: newTasksList,
      columns: newColumns,
    };

    setDashboard(newDashboard);
    setInputEntry('');
    setInputError(false);
  };

  const updateTask = (taskId) => {
    const newTask = document.getElementById('input-field').value;

    if (newTask === '') {
      setInputError(true);
      return;
    }

    const newTasksList = {
      ...props.dashboard.tasks,
      [taskId]: {
        id: taskId,
        content: props.inputEntry,
      },
    };

    const newDashboard = {
      ...props.dashboard,
      tasks: newTasksList,
    };

    setDashboard(newDashboard);
    setEditedTask();
    setInputEntry('');
    setInputError(false);
  };

  const cancelUpdate = () => {
    const newDashboard = {
      ...props.dashboard,
    };

    setDashboard(newDashboard);
    setEditedTask();
    setInputEntry('');
    setInputError(false);
  };

  return (
    <section className="header">
      <MuiHeading1 />
      <div className="task-form">
        <MuiTextField
          setInputEntry={setInputEntry}
          setInputError={setInputError}
          inputValue={props.inputEntry}
          inputError={inputError}
          editedTask={props.editedTask}
        />
        <MuiButton
          addTask={addTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
          editedTask={props.editedTask}
          label={props.editedTask === undefined ? 'Ajouter' : 'Modifier'}
        />
        {props.editedTask === undefined ? null : (
          <MuiButton
            addTask={addTask}
            updateTask={updateTask}
            cancelUpdate={cancelUpdate}
            editedTask={props.editedTask}
            label="Annuler"
          />
        )}
      </div>
    </section>
  );
};

export default Header;
