import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomizedMenu from '../../CustomizedMenu';
import './MuiCard.css';

const MuiCard = (props) => {
  return (
    <Card>
      <CardContent>
        <div className="task-header">
          <h3 className="task-title">{props.task.title}</h3>
          <CustomizedMenu
            itemType="task"
            item={props.task}
            deleteItem={props.deleteTask}
            setDashboardForm={null}
            setEditedTask={props.setEditedTask}
            setInputEntry={props.setInputEntry}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
