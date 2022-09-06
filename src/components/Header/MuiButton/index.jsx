import { Button } from '@mui/material';
import './MuiButton.css';

const MuiButton = (props) => {
  const doTraitment = props.doTraitment;

  return (
    <Button
      id={`${props.label.toLowerCase()}-btn`}
      variant="contained"
      color={props.label === 'Annuler' ? 'error' : 'primary'}
      onClick={(e) => {
        e.preventDefault();
        doTraitment(
          props.label === 'Ajouter'
            ? 'add'
            : props.label === 'Annuler'
            ? 'cancel'
            : 'update',
          props.editedTask
        );
      }}
    >
      {props.label}
    </Button>
  );
};

export default MuiButton;
