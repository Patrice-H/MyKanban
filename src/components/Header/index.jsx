import { useState, useEffect } from 'react';
import { createTask } from '../../services/dbManager';
import MuiButton from './MuiButton';
import MuiHeading1 from './MuiHeading1';
import MuiTextField from './MuiTextField';
import './Header.css';

const Header = (props) => {
  const [message, setMessage] = useState();
  const [task, setTask] = useState();
  const [inputError, setInputError] = useState(false);
  const setDashboard = props.setDashboard;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;
  const setDbList = props.setDbList;

  const doTraitment = (action, taskId) => {
    const newTask = document.getElementById('input-field').value;
    let newDashboard;
    if (action === 'cancel') {
      newDashboard = { ...props.dashboard };
    } else {
      if (newTask === '') {
        setInputError(true);
        return;
      }
      if (action === 'add') {
        const todoList = props.dbList.filter(
          (task) => task.category === 'to do'
        );
        const taskOrder = todoList.length + 1;
        createTask(newTask, 'to do', taskOrder).then((data) => {
          setMessage(data.message);
          setTask(data.data);
          setDbList([...props.dbList, data.data]);
        });

        const newTaskId = 'task-' + (props.lastTaskId + 1);
        const newTasksList = {
          ...props.dashboard.tasks,
          [newTaskId]: {
            id: newTaskId,
            title: newTask,
          },
        };
        const newTaskListIds = Array.from(
          props.dashboard.columns['column-1'].taskIds
        );
        newTaskListIds.splice(props.lastTaskId, 0, newTaskId);
        const newColumns = {
          ...props.dashboard.columns,
          'column-1': {
            ...props.dashboard.columns['column-1'],
            taskIds: newTaskListIds,
          },
        };
        newDashboard = {
          ...props.dashboard,
          tasks: newTasksList,
          columns: newColumns,
        };
        const setLastTaskId = props.setLastTaskId;
        setLastTaskId(props.lastTaskId + 1);
      }
      if (action === 'update') {
        const newTasksList = {
          ...props.dashboard.tasks,
          [taskId]: {
            id: taskId,
            title: props.inputEntry,
          },
        };
        newDashboard = {
          ...props.dashboard,
          tasks: newTasksList,
        };
      }
    }

    setDashboard(newDashboard);
    setEditedTask();
    setInputEntry('');
    setInputError(false);
  };

  useEffect(() => {
    message && console.log(message);
    task && console.log(task);
  }, [message, task]);

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
          doTraitment={doTraitment}
          editedTask={props.editedTask}
          label={props.editedTask === undefined ? 'Ajouter' : 'Modifier'}
        />
        {props.editedTask === undefined ? null : (
          <MuiButton
            doTraitment={doTraitment}
            editedTask={props.editedTask}
            label="Annuler"
          />
        )}
      </div>
    </section>
  );
};

export default Header;
