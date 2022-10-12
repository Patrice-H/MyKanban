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
          item={props.task}
          deleteItem={props.deleteTask}
          setDashboardForm={null}
          setEditedTask={props.setEditedTask}
          setInputEntry={props.setInputEntry}
        />
      </CardContent>
    </Card>
  );
};

export default MuiCard;
