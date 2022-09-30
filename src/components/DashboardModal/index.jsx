import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { createCategory, createDashboard } from '../../services/dbManager';
import { closeDashboardModal } from '../../utils/functions';

const DashboardModal = (props) => {
  const setDisplayController = props.setDisplayController;
  const setDashboardForm = props.setDashboardForm;

  const saveDashboard = async () => {
    let dashboardId;
    let columnsTitle = [];
    let columnsError = [...props.dashboardForm.columns.inputError];
    let formError = false;
    let dashboardTitle = document.getElementById('dashboard-title-input').value;
    if (dashboardTitle === '') {
      setDashboardForm({
        dashboard: {
          inputEntry: props.dashboardForm.dashboard.inputEntry,
          inputError: true,
        },
        columns: props.dashboardForm.columns,
      });
      formError = true;
    }

    if (props.dashboardForm.columns.inputFields.length > 0) {
      props.dashboardForm.columns.inputFields.forEach((column, index) => {
        let category = document.getElementById(`input-column-${column}`).value;
        columnsTitle.push(category);
        if (category === '') {
          columnsError[index] = true;
          formError = true;
        }
      });
      setDashboardForm({
        dashboard: props.dashboardForm.dashboard,
        columns: {
          ...props.dashboardForm.columns,
          inputError: columnsError,
        },
      });
    }

    if (formError) {
      return;
    } else {
      await createDashboard(dashboardTitle).then((data) => {
        dashboardId = data.data.id;
      });

      for (let i = 0; i < columnsTitle.length; i++) {
        await createCategory(
          columnsTitle[i],
          i + 1,
          'rgba(255, 255, 0, 0.25)',
          dashboardId
        );
      }
      setDashboardForm({
        dashboard: {
          ...props.dashboardForm.dashboard,
          inputEntry: '',
        },
        columns: {
          ...props.dashboardForm.columns,
          number: '',
        },
      });
      setDisplayController({
        ...props.displayController,
        dashboards: [],
        isDashboardsLoaded: false,
      });
      closeDashboardModal();
    }
  };

  useEffect(() => {
    let columns = [];
    let columnsEntry = [];
    let columnsError = [];
    if (props.dashboardForm.columns.number !== '') {
      for (let i = 0; i < props.dashboardForm.columns.number; i++) {
        columns.push(i + 1);
        columnsError.push(false);
        if (props.dashboardForm.columns.inputEntry[i]) {
          columnsEntry.push(props.dashboardForm.columns.inputEntry[i]);
        } else {
          columnsEntry.push('');
        }
      }
    }
    setDashboardForm({
      dashboard: {
        ...props.dashboardForm.dashboard,
      },
      columns: {
        ...props.dashboardForm.columns,
        inputFields: columns,
        inputEntry: columnsEntry,
        inputError: columnsError,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dashboardForm.columns.number]);

  return (
    <div className="modal hidden" id="dashboard-modal">
      <div
        id="dashboard-modal-content"
        className={
          props.dashboardForm.columns.number > 5 ? 'scrolled-modal' : null
        }
      >
        <TextField
          id="dashboard-title-input"
          required
          variant="outlined"
          label="Titre du tableau de bord"
          value={props.dashboardForm.dashboard.inputEntry}
          onChange={(e) => {
            setDashboardForm({
              dashboard: {
                inputEntry: e.target.value,
                inputError: false,
              },
              columns: props.dashboardForm.columns,
            });
          }}
          error={props.dashboardForm.dashboard.inputError}
          helperText={
            props.dashboardForm.dashboard.inputError ? 'Titre requis' : null
          }
          sx={{ width: '250px' }}
        />
        <TextField
          variant="outlined"
          label="Nombre de colonnes"
          type="number"
          InputProps={{ inputProps: { min: '0', max: '20', step: '1' } }}
          value={props.dashboardForm.columns.number}
          onChange={(e) => {
            setDashboardForm({
              dashboard: props.dashboardForm.dashboard,
              columns: {
                ...props.dashboardForm.columns,
                number: e.target.value,
              },
            });
          }}
          sx={{ width: '250px' }}
        />
        {props.dashboardForm.columns.inputFields &&
          props.dashboardForm.columns.inputFields.map((column) => (
            <TextField
              key={`column-${column}`}
              id={`input-column-${column}`}
              required
              variant="outlined"
              label={`Titre de la colonne ${column}`}
              value={props.dashboardForm.columns.inputEntry[column - 1]}
              onChange={(e) => {
                let columnsEntry = [...props.dashboardForm.columns.inputEntry];
                let columnsError = [...props.dashboardForm.columns.inputError];
                columnsEntry[column - 1] = e.target.value;
                columnsError[column - 1] = false;
                setDashboardForm({
                  dashboard: props.dashboardForm.dashboard,
                  columns: {
                    ...props.dashboardForm.columns,
                    inputEntry: columnsEntry,
                    inputError: columnsError,
                  },
                });
              }}
              error={props.dashboardForm.columns.inputError[column - 1]}
              helperText={
                props.dashboardForm.columns.inputError[column - 1]
                  ? 'Titre requis'
                  : null
              }
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
              setDashboardForm({
                dashboard: {
                  inputEntry: '',
                  inputError: false,
                },
                columns: {
                  ...props.dashboardForm.columns,
                  number: '',
                },
              });
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
