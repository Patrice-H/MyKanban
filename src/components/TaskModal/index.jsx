import { Button, TextField } from '@mui/material';
import { closeModal } from '../../utils/functions';
import './TaskModal.css';

const TaskModal = (props) => {
  const setTaskForm = props.setTaskForm;

  const saveTask = () => {
    let taskTitle = document.getElementById('task-title-input').value;
    if (taskTitle === '') {
      setTaskForm({
        ...props.taskForm,
        inputError: true,
      });
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
            Ajouter
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
