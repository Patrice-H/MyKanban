import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createDashboard } from '../../services/dbManager';

const DashboardModal = () => {
  const [dashboardInputEntry, setDashboardInputEntry] = useState('');
  const [dashbordInputError, setDashboardInputError] = useState(false);

  const closeDashboardModal = () => {
    const modal = document.getElementById('dashboard-modal');
    modal.classList.add('hidden');
  };
  const saveDashboard = () => {
    let dashboardTitle = document.getElementById('dashboard-title-input').value;
    if (dashboardTitle === '') {
      setDashboardInputError(true);

      return;
    }
    createDashboard(dashboardTitle);
    setDashboardInputEntry('');
    closeDashboardModal();
  };

  return (
    <div className="modal hidden" id="dashboard-modal">
      <div id="dashboard-modal-content">
        <TextField
          id="dashboard-title-input"
          required
          variant="outlined"
          label="Titre du tableau de bord"
          value={dashboardInputEntry}
          onChange={(e) => {
            setDashboardInputEntry(e.target.value);
            setDashboardInputError(false);
          }}
          error={dashbordInputError}
          helperText={dashbordInputError ? 'Titre requis' : null}
        />
        <div>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              saveDashboard();
            }}
          >
            créer
          </Button>
          <Button
            variant="contained"
            color="error"
            id="close-dashboard-modal"
            onClick={(e) => {
              e.preventDefault();
              setDashboardInputError(false);
              closeDashboardModal();
            }}
          >
            Annuler
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
