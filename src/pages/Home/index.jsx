import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Thumbnail from '../../components/Thumbnail';
import { getDashboardsList } from '../../services/dbManager';
import DashboardModal from '../../components/DashboardModal';
import { openModal } from '../../utils/functions';
import { initialData } from '../../data/initialData';
import './Home.css';

const Home = (props) => {
  const [displayController, setDisplayController] = useState({
    dashboards: [],
    isDashboardsLoaded: false,
  });
  const [dashboardForm, setDashboardForm] = useState({
    dashboard: {
      id: '',
      inputEntry: '',
      inputError: false,
    },
    columns: {
      number: '',
      ids: [],
      inputFields: [],
      inputEntry: [],
      inputError: [],
      backgrounds: [],
    },
  });
  const [modalType, setModalType] = useState();
  const setDashboard = props.setDashboard;
  const setDbData = props.setDbData;

  useEffect(() => {
    if (!displayController.isDashboardsLoaded) {
      let dashboardsList = [];
      getDashboardsList().then((data) => {
        data.data.forEach((item) => dashboardsList.push(item));
        setDisplayController({
          ...displayController,
          dashboards: dashboardsList,
          isDashboardsLoaded: true,
        });
      });
    }
    setDashboard(initialData);
    setDbData({ categories: [], tasks: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayController.dashboards]);

  return (
    <div>
      <Button
        variant="contained"
        id="add-dashboard-btn"
        onClick={(e) => {
          e.preventDefault();
          setModalType('adding');
          openModal('dashboard-modal');
        }}
      >
        Nouveau tableau
      </Button>
      <h1 className="main-title">Tableaux de bord</h1>
      <div className="thumbnails-container">
        {displayController.dashboards.length > 0 &&
          displayController.dashboards.map((dashboard) => (
            <Thumbnail
              key={`thumbnail-${dashboard.id}`}
              dashboard={dashboard}
              setDisplayController={setDisplayController}
              setDashboardForm={setDashboardForm}
            />
          ))}
      </div>
      <DashboardModal
        displayController={displayController}
        dashboardForm={dashboardForm}
        modalType={modalType}
        setDisplayController={setDisplayController}
        setDashboardForm={setDashboardForm}
        setModalType={setModalType}
      />
    </div>
  );
};

export default Home;
