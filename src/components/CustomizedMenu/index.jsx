import { useState } from 'react';
import { useNavigate } from 'react-router';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandIcon from '@mui/icons-material/Expand';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { openDashboardModal } from '../../utils/functions';
import { getCategoriesList } from '../../services/dbManager';

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
  const navigate = useNavigate();
  const deleteItem = props.deleteItem;
  const setDashboardForm = props.setDashboardForm;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;
  const setIsCardExpanded = props.setIsCardExpanded;
  const open = Boolean(anchorEl);
  const textMenu = props.isCardExpanded ? 'Fermer' : 'Ouvrir';

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openCard = () => {
    handleClose();
    if (props.itemType === 'dashboard') {
      navigate(`/dashboard/${props.item.id}`);
    } else {
      setIsCardExpanded(true);
    }
  };

  const closeCard = () => {
    handleClose();
    setIsCardExpanded(false);
  };

  const toggleCard = () => {
    if (props.isCardExpanded) {
      closeCard();
    } else {
      openCard();
    }
  };

  const deleteCard = () => {
    const text =
      props.itemType === 'dashboard' ? 'ce tableau de bord' : 'cette tâche';
    handleClose();
    if (
      window.confirm(
        `Voulez vous réellement supprimer ${text} et tout son contenu ?`
      )
    ) {
      deleteItem(props.item.id);
    }
  };

  const updateCard = async () => {
    handleClose();
    if (props.itemType === 'dashboard') {
      let columnsIds = [];
      let inputFields = [];
      let inputEntry = [];
      let inputError = [];
      let backgrounds = [];
      const categories = await getCategoriesList().then((data) => {
        return data.data.filter(
          (category) => category.dashboard_id === props.item.id
        );
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
          id: props.item.id,
          inputEntry: props.item.title,
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
    } else {
      setEditedTask(props.item.id);
      setInputEntry(props.item.title);
    }
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
        <MenuItem onClick={toggleCard} disableRipple>
          {props.itemType === 'dashboard' ? (
            <OpenInNewIcon />
          ) : props.isCardExpanded ? (
            <CloseIcon />
          ) : (
            <ExpandIcon />
          )}
          {textMenu}
        </MenuItem>
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
