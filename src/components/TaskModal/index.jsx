import { Button, TextField } from '@mui/material';
import { createTask } from '../../services/dbManager';
import { closeModal } from '../../utils/functions';
import './TaskModal.css';

const TaskModal = (props) => {
  const setTaskForm = props.setTaskForm;
  const setModalType = props.setModalType;
  const setDashboard = props.setDashboard;
  const setMessage = props.setMessage;
  const setIsSnackbarOpen = props.setIsSnackbarOpen;

  const saveTask = async () => {
    let newDashboard;
    let formError = false;
    let taskTitle = document.getElementById('task-title-input').value;
    if (taskTitle === '') {
      setTaskForm({
        ...props.taskForm,
        inputError: true,
      });
    }

    if (formError) {
      return;
    } else {
      if (props.modalType === 'adding') {
        let lastId;
        const taskOrder =
          props.dashboard.columns['column-1'].taskIds.length + 1;
        await createTask(
          taskTitle,
          taskOrder,
          props.categories[0].id,
          props.dashboardId
        ).then((data) => {
          lastId = data.data.id;
          setMessage(data.message);
          setIsSnackbarOpen(true);
        });

        const newTaskId = 'task-' + lastId;
        const newTasksList = {
          ...props.dashboard.tasks,
          [newTaskId]: {
            id: newTaskId,
            title: taskTitle,
          },
        };
        const newTaskListIds = Array.from(
          props.dashboard.columns['column-1'].taskIds
        );
        newTaskListIds.splice(lastId - 1, 0, newTaskId);
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

        let entry = {
          title: '',
          description: '',
        };
        setTaskForm({
          ...props.taskForm,
          inputEntry: entry,
          inputError: false,
        });
        setDashboard(newDashboard);
        closeModal('task-modal');
      }
    }
  };

  return (
    <div className="modal hidden-modal" id="task-modal">
      <div id="task-modal-content">
        <TextField
          id="task-title-input"
          variant="outlined"
          required
          label="Titre de la tâche"
          value={props.taskForm.inputEntry.title}
          onChange={(e) => {
            let entry = {
              title: e.target.value,
              description: props.taskForm.inputEntry.description,
            };
            setTaskForm({
              ...props.taskForm,
              inputEntry: entry,
              inputError: false,
            });
          }}
          error={props.taskForm.inputError}
          helperText={props.taskForm.inputError ? 'Titre requis' : null}
        />
        <TextField
          variant="outlined"
          label="Description"
          multiline
          maxRows={15}
          value={props.taskForm.inputEntry.description}
          onChange={(e) => {
            let entry = {
              title: props.taskForm.inputEntry.title,
              description: e.target.value,
            };
            setTaskForm({
              ...props.taskForm,
              inputEntry: entry,
            });
          }}
        />
        <div className="modal-btns">
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              saveTask();
            }}
          >
            {props.modalType === 'adding' ? 'ajouter' : 'mettre à jour'}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              e.preventDefault();
              let entry = {
                title: '',
                description: '',
              };
              setTaskForm({
                ...props.taskForm,
                inputEntry: entry,
                inputError: false,
              });
              closeModal('task-modal');
              setModalType();
            }}
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
