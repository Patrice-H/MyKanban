import { Button } from '@mui/material';
import './TaskModal.css';

const TaskModal = () => {
  return (
    <div className="modal hidden-modal" id="task-modal">
      <div id="task-modal-content">
        <div id="task-modal-btns">
          <Button variant="contained">Ajouter</Button>
          <Button variant="contained" color="error">
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
