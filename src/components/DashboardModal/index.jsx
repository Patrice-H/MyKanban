import { useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import {
  createCategory,
  createDashboard,
  removeCategory,
  updateCategory,
  updateDashboard,
} from '../../services/dbManager';
import { closeModal } from '../../utils/functions';
import ColorPicker from '../ColorPicker';
import './DashboardModal.css';

const DashboardModal = (props) => {
  const setDisplayController = props.setDisplayController;
  const setDashboardForm = props.setDashboardForm;
  const setModalType = props.setModalType;

  const saveDashboard = async () => {
    let dashboardId;
    let columnsTitle = [];
    let columnsColor = [];
    let columnsError = [...props.dashboardForm.columns.inputError];
    let formError = false;
    let dashboardTitle = document.getElementById('dashboard-title-input').value;
    if (dashboardTitle === '') {
      setDashboardForm({
        dashboard: {
          ...props.dashboardForm.dashboard,
          inputError: true,
        },
        columns: props.dashboardForm.columns,
      });
      formError = true;
    }

    if (props.dashboardForm.columns.inputFields.length > 0) {
      props.dashboardForm.columns.inputFields.forEach((column, index) => {
        let category = document.getElementById(`input-column-${column}`).value;
        let backgroundColor = document.getElementById(
          `color-picker-column-${column}`
        ).style.background;
        columnsTitle.push(category);
        columnsColor.push(backgroundColor);
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
      if (props.modalType === 'adding') {
        await createDashboard(dashboardTitle).then((data) => {
          dashboardId = data.data.id;
        });

        for (let i = 0; i < columnsTitle.length; i++) {
          await createCategory(
            columnsTitle[i],
            i + 1,
            props.dashboardForm.columns.backgrounds[i],
            dashboardId
          );
        }
      } else {
        await updateDashboard(props.dashboardForm.dashboard.id, dashboardTitle);
        for (let i = 0; i < props.dashboardForm.columns.number; i++) {
          if (props.dashboardForm.columns.ids[i] !== undefined) {
            await updateCategory(
              props.dashboardForm.columns.ids[i],
              columnsTitle[i],
              i + 1,
              props.dashboardForm.columns.backgrounds[i],
              props.dashboardForm.dashboard.id
            );
          } else {
            await createCategory(
              columnsTitle[i],
              i + 1,
              props.dashboardForm.columns.backgrounds[i],
              props.dashboardForm.dashboard.id
            );
          }
        }
        for (
          let i = props.dashboardForm.columns.number;
          i < props.dashboardForm.columns.ids.length;
          i++
        ) {
          removeCategory(props.dashboardForm.columns.ids[i]);
        }
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
      closeModal('dashboard-modal');
      setModalType();
    }
  };

  useEffect(() => {
    let columns = [];
    let columnsEntry = [];
    let columnsError = [];
    let columnsColor = [];
    if (props.dashboardForm.columns.number !== '') {
      for (let i = 0; i < props.dashboardForm.columns.number; i++) {
        columns.push(i + 1);
        columnsError.push(false);
        if (props.dashboardForm.columns.inputEntry[i]) {
          columnsEntry.push(props.dashboardForm.columns.inputEntry[i]);
          columnsColor.push(props.dashboardForm.columns.backgrounds[i]);
        } else {
          columnsEntry.push('');
          columnsColor.push('rgba(255, 255, 0, 0.25)');
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
        backgrounds: columnsColor,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.dashboardForm.columns.number]);

  return (
    <div className="modal hidden-modal" id="dashboard-modal">
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
                ...props.dashboardForm.dashboard,
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
          sx={{ width: '310px' }}
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
          sx={{ width: '310px' }}
        />
        {props.dashboardForm.columns.inputFields &&
          props.dashboardForm.columns.inputFields.map((column) => (
            <div key={`column-${column}`} className="columns-inputs">
              <TextField
                id={`input-column-${column}`}
                required
                variant="outlined"
                label={`Titre de la colonne ${column}`}
                value={props.dashboardForm.columns.inputEntry[column - 1]}
                onChange={(e) => {
                  let columnsEntry = [
                    ...props.dashboardForm.columns.inputEntry,
                  ];
                  let columnsError = [
                    ...props.dashboardForm.columns.inputError,
                  ];
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
              <ColorPicker
                columnId={column}
                dashboardForm={props.dashboardForm}
                setDashboardForm={setDashboardForm}
              />
            </div>
          ))}
        <div className="modal-btns">
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              saveDashboard();
            }}
          >
            {props.modalType === 'adding' ? 'ajouter' : 'mettre à jour'}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              e.preventDefault();
              setDashboardForm({
                dashboard: {
                  ...props.dashboardForm.dashboard,
                  inputEntry: '',
                  inputError: false,
                },
                columns: {
                  ...props.dashboardForm.columns,
                  number: '',
                },
              });
              closeModal('dashboard-modal');
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

export default DashboardModal;
