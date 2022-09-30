import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Thumbnail from '../../components/Thumbnail';
import { getDashboardsList } from '../../services/dbManager';
import DashboardModal from '../../components/DashboardModal';
import { openDashboardModal } from '../../utils/functions';
import './Home.css';

const Home = () => {
  const [displayController, setDisplayController] = useState({
    dashboards: [],
    isDashboardsLoaded: false,
  });
  const [dashboardForm, setDashboardForm] = useState({
    dashboard: {
      inputEntry: '',
      inputError: false,
    },
    columns: {
      number: '',
      inputFields: [],
      inputEntry: [],
      inputError: [],
    },
  });

  useEffect(() => {
    if (!displayController.isDashboardsLoaded) {
      let dashboardIds = [];
      getDashboardsList().then((data) => {
        data.data.forEach((item) => dashboardIds.push(item.id));
        setDisplayController({
          ...displayController,
          dashboards: dashboardIds,
          isDashboardsLoaded: true,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayController.dashboards]);

  return (
    <div>
      <Button
        variant="contained"
        id="add-dashboard-btn"
        onClick={(e) => {
          e.preventDefault();
          openDashboardModal();
        }}
      >
        Nouveau tableau
      </Button>
      <h1 className="main-title">Tableaux de bord</h1>
      {displayController.dashboards.length > 0 &&
        displayController.dashboards.map((dashboard) => (
          <Thumbnail
            key={`thumbnail-${dashboard}`}
            dashboardId={dashboard}
            setDisplayController={setDisplayController}
          />
        ))}
      <DashboardModal
        displayController={displayController}
        dashboardForm={dashboardForm}
        setDisplayController={setDisplayController}
        setDashboardForm={setDashboardForm}
      />
    </div>
  );
};

export default Home;
