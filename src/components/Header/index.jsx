import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createTask, updateTask } from '../../services/dbManager';
import { getCategoryId, openModal } from '../../utils/functions';
import { Button } from '@mui/material';
import MuiButton from './MuiButton';
import MuiHeading1 from './MuiHeading1';
import MuiTextField from './MuiTextField';
import './Header.css';

const Header = (props) => {
  const [inputError, setInputError] = useState(false);
  const setDashboard = props.setDashboard;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;
  const setMessage = props.setMessage;
  const setIsSnackbarOpen = props.setIsSnackbarOpen;
  const setModalType = props.setModalType;

  return (
    <section className="header">
      <Link to="/" id="home-link">
        retour aux tableaux de bord
      </Link>
      <Button
        variant="contained"
        id="open-task-modal-btn"
        onClick={(e) => {
          e.preventDefault();
          openModal('task-modal');
          setModalType('adding');
        }}
      >
        Nouvelle tâche
      </Button>
      <MuiHeading1 dashboardId={props.dashboardId} />
    </section>
  );
};

export default Header;
