import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Thumbnail from '../../components/Thumbnail';
import { getDashboardsList } from '../../services/dbManager';
import DashboardModal from '../../components/DashboardModal';
import { openDashboardModal } from '../../utils/functions';
import './Home.css';

const Home = (props) => {
  const [pages, setPages] = useState();
  const [isDashboardsLoaded, setIsDashboardsLoaded] = useState(false);

  useEffect(() => {
    if (!isDashboardsLoaded) {
      let dashboardIds = [];
      getDashboardsList().then((data) => {
        data.data.forEach((item) => dashboardIds.push(item.id));
        setPages(dashboardIds);
      });
      setIsDashboardsLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages]);

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
      {pages &&
        pages.map((page) => (
          <Thumbnail
            key={`thumbnail-${page}`}
            pageId={page}
            className="thumbnail"
          />
        ))}
      <DashboardModal
        setIsDashboardsLoaded={setIsDashboardsLoaded}
        setPages={setPages}
      />
    </div>
  );
};

export default Home;
