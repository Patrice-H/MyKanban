import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './MuiCard.css';

const MuiCard = (props) => {
  return (
    <Card>
      <CardContent>
        <h3 className="task-title">{props.task.content}</h3>
        <div className="task-item-btns">
          <span
            className="fa-solid fa-pencil"
            onClick={(e) => {
              e.preventDefault();
              props.setEditedTask(props.task.id);
              props.setInputEntry(props.task.content);
            }}
          ></span>
          <span
            className="fa-solid fa-trash-can"
            onClick={(e) => {
              e.preventDefault();
              props.deleteTask(props.task.id);
            }}
          ></span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
