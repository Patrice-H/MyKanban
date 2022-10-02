import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { openDashboardModal } from '../../utils/functions';
import { getCategoriesList, getDashboard } from '../../services/dbManager';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  //const setEditedTask = props.setEditedTask;
  //const setInputEntry = props.setInputEntry;
  const deleteItem = props.deleteItem;
  const setDashboardForm = props.setDashboardForm;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteCard = () => {
    const text =
      props.item === 'dashboard' ? 'ce tableau de bord' : 'cette tâche';
    handleClose();
    if (
      window.confirm(
        `Voulez vous réellement supprimer ${text} et tout son contenu ?`
      )
    ) {
      deleteItem(props.itemId);
    }
  };
  const updateCard = async () => {
    handleClose();
    if (props.item === 'dashboard') {
      let columnsIds = [];
      let inputFields = [];
      let inputEntry = [];
      let inputError = [];
      let backgrounds = [];
      const categories = await getCategoriesList().then((data) => {
        return data.data.filter(
          (category) => category.dashboard_id === props.itemId
        );
      });
      const dashboard = await getDashboard(props.itemId).then((data) => {
        return data.data;
      });
      for (let i = 0; i < categories.length; i++) {
        columnsIds.push(categories[i].id);
        inputFields.push(i + 1);
        inputError.push(false);
        inputEntry.push(categories[i].title);
        backgrounds.push(categories[i].background_color);
      }
      setDashboardForm({
        dashboard: {
          id: dashboard.id,
          inputEntry: dashboard.title,
          inputError: false,
        },
        columns: {
          ids: columnsIds,
          number: categories.length,
          inputFields,
          inputEntry,
          inputError,
          backgrounds,
        },
      });
      openDashboardModal();
    }

    //setEditedTask(props.task.id);
    //setInputEntry(props.task.title);
  };

  return (
    <div className="dashboard-menu">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={updateCard} disableRipple>
          <EditIcon />
          Modifier
        </MenuItem>
        <MenuItem onClick={deleteCard} disableRipple>
          <DeleteIcon />
          Supprimer
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
