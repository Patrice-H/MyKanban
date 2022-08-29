import { TextField } from '@mui/material';
// essayer useContext pour editedTask
const MuiTextField = ({
  setInputEntry,
  setInputError,
  inputValue,
  inputError,
  editedTask,
}) => {
  const label =
    editedTask === undefined ? 'Ajouter une tâche' : 'Modifier la tâche';

  return (
    <TextField
      required={editedTask === undefined ? true : false}
      id="input-field"
      label={label}
      variant="outlined"
      value={inputValue}
      onChange={(e) => {
        setInputEntry(e.target.value);
        setInputError(false);
      }}
      error={!inputValue && inputError}
      helperText={!inputValue && inputError ? 'Task required' : null}
    />
  );
};

export default MuiTextField;
