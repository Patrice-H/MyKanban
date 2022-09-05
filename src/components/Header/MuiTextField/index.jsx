import { TextField } from '@mui/material';

const MuiTextField = (props) => {
  const label =
    props.editedTask === undefined ? 'Ajouter une tâche' : 'Modifier la tâche';

  return (
    <TextField
      required={props.editedTask === undefined ? true : false}
      id="input-field"
      label={label}
      variant="outlined"
      value={props.inputValue}
      onChange={(e) => {
        props.setInputEntry(e.target.value);
        props.setInputError(false);
      }}
      error={!props.inputValue && props.inputError}
      helperText={
        !props.inputValue && props.inputError ? 'Task required' : null
      }
    />
  );
};

export default MuiTextField;
