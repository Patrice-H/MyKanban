import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomizedMenu from '../../CustomizedMenu';
import './MuiCard.css';

const MuiCard = (props) => {
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  return (
    <Card>
      <CardContent>
        <div className="task-header">
          <h3 className="task-title">{props.task.title}</h3>
          <CustomizedMenu
            itemType="task"
            item={props.task}
            isCardExpanded={isCardExpanded}
            deleteItem={props.deleteTask}
            setDashboardForm={null}
            setEditedTask={props.setEditedTask}
            setInputEntry={props.setInputEntry}
            setIsCardExpanded={setIsCardExpanded}
            setTaskForm={props.setTaskForm}
          />
        </div>
        <div
          className={
            isCardExpanded ? 'task-body' : 'task-body hidden-description'
          }
        >
          <h4>Description :</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
