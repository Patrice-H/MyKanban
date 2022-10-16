import { Button, TextField } from '@mui/material';
import { closeModal } from '../../utils/functions';
import './TaskModal.css';

const TaskModal = () => {
  return (
    <div className="modal hidden-modal" id="task-modal">
      <div id="task-modal-content">
        <TextField variant="outlined" label="Titre de la tâche" />
        <TextField
          variant="outlined"
          label="Description"
          multiline
          maxRows={15}
        />
        <div className="modal-btns">
          <Button variant="contained">Ajouter</Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              e.preventDefault();
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
