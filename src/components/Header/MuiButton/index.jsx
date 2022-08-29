import { Button } from '@mui/material';
import './MuiButton.css';

const MuiButton = (props) => {
  return (
    <Button
      id={`${props.label.toLowerCase()}-btn`}
      variant="contained"
      color={props.label === 'Annuler' ? 'error' : 'primary'}
      onClick={(e) => {
        e.preventDefault();
        props.editedTask === undefined
          ? props.addTask()
          : props.label === 'Modifier'
          ? props.updateTask(props.editedTask)
          : props.cancelUpdate();
      }}
    >
      {props.label}
    </Button>
  );
};

export default MuiButton;
