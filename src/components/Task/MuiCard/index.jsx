import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomizedMenus from '../CustomizedMenus';
import './MuiCard.css';

const MuiCard = (props) => {
  return (
    <Card>
      <CardContent>
        <h3 className="task-title">{props.task.title}</h3>
        <CustomizedMenus
          itemType="task"
          task={props.task}
          setEditedTask={props.setEditedTask}
          setInputEntry={props.setInputEntry}
          deleteItem={props.deleteTask}
        />
      </CardContent>
    </Card>
  );
};

export default MuiCard;
