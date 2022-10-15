import { Button } from '@mui/material';
import { closeModal } from '../../utils/functions';
import './TaskModal.css';

const TaskModal = () => {
  return (
    <div className="modal hidden-modal" id="task-modal">
      <div id="task-modal-content">
        <div id="task-modal-btns">
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
