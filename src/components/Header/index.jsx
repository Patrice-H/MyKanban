import { Link } from 'react-router-dom';
import { openModal } from '../../utils/functions';
import { Button } from '@mui/material';
import MuiHeading1 from './MuiHeading1';
import './Header.css';

const Header = (props) => {
  const setModalType = props.setModalType;

  return (
    <section className="header" data-testid="header">
      <Link to="/" id="home-link">
        retour aux tableaux de bord
      </Link>
      <Button
        variant="contained"
        id="open-task-modal-btn"
        onClick={(e) => {
          e.preventDefault();
          openModal('task-modal');
          setModalType('adding');
        }}
      >
        Nouvelle tâche
      </Button>
      <MuiHeading1 dashboardId={props.dashboardId} />
    </section>
  );
};

export default Header;
