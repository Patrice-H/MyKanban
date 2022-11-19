import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CustomizedMenu from '../../CustomizedMenu';
import './MuiCard.css';

/**
 * Material UI card component
 *
 * @component
 * @description It returns a card with the title and the description of a task.
 * @returns {JSX} The React component.
 */
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
            setModalType={props.setModalType}
            setDashboardForm={null}
            setTaskForm={props.setTaskForm}
            setIsCardExpanded={setIsCardExpanded}
          />
        </div>
        <div
          className={
            isCardExpanded ? 'task-body' : 'task-body hidden-description'
          }
        >
          <h4 className="task-description">Description :</h4>
          <p className="task-description">{props.task.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
