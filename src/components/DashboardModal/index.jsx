import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { createCategory, createDashboard } from '../../services/dbManager';
import { closeDashboardModal } from '../../utils/functions';

const DashboardModal = (props) => {
  const [dashboardInputEntry, setDashboardInputEntry] = useState('');
  const [dashbordInputError, setDashboardInputError] = useState(false);
  const [columnsNumber, setColumnsNumber] = useState('');
  const [columnsInput, setColumnsInput] = useState([]);
  const setIsDashboardsLoaded = props.setIsDashboardsLoaded;
  const setPages = props.setPages;

  const saveDashboard = async () => {
    let dashboardId;
    let columnsTitle = [];
    let dashboardTitle = document.getElementById('dashboard-title-input').value;
    if (dashboardTitle === '') {
      setDashboardInputError(true);

      return;
    }
    await createDashboard(dashboardTitle).then((data) => {
      dashboardId = data.data.id;
    });

    if (columnsInput.length > 0) {
      columnsInput.forEach((column) => {
        let category = document.getElementById(`input-column-${column}`).value;
        columnsTitle.push(category);
      });
    }

    for (let i = 0; i < columnsTitle.length; i++) {
      await createCategory(
        columnsTitle[i],
        i + 1,
        'rgba(255, 255, 0, 0.25)',
        dashboardId
      );
    }
    setDashboardInputEntry('');
    setColumnsNumber('');
    setIsDashboardsLoaded(false);
    setPages([]);
    closeDashboardModal();
  };

  useEffect(() => {
    let columns = [];
    if (columnsNumber !== '') {
      for (let i = 0; i < columnsNumber; i++) {
        columns.push(i + 1);
      }
    }
    setColumnsInput(columns);
  }, [columnsNumber]);

  return (
    <div className="modal hidden" id="dashboard-modal">
      <div
        id="dashboard-modal-content"
        className={columnsNumber > 5 ? 'scrolled-modal' : null}
      >
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
          sx={{ width: '250px' }}
        />
        <TextField
          variant="outlined"
          label="Nombre de colonnes"
          type="number"
          InputProps={{ inputProps: { min: '0', max: '20', step: '1' } }}
          value={columnsNumber}
          onChange={(e) => {
            setColumnsNumber(e.target.value);
          }}
          sx={{ width: '250px' }}
        />
        {columnsInput &&
          columnsInput.map((column) => (
            <TextField
              key={`column-${column}`}
              id={`input-column-${column}`}
              required
              variant="outlined"
              label={`Titre de la colonne ${column}`}
              sx={{ width: '250px' }}
            />
          ))}
        <div id="dashboard-modal-btns">
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
            onClick={(e) => {
              e.preventDefault();
              setDashboardInputError(false);
              setColumnsNumber('');
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
