import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Thumbnail from '../../components/Thumbnail';
import { getDashboardsList } from '../../services/dbManager';
import DashboardModal from '../../components/DashboardModal';
import './Home.css';

const Home = () => {
  const [pages, setPages] = useState();

  const openDashboardModal = () => {
    const modal = document.getElementById('dashboard-modal');
    modal.classList.remove('hidden');
  };

  useEffect(() => {
    let dashboardIds = [];
    getDashboardsList().then((data) => {
      data.data.forEach((item) => dashboardIds.push(item.id));
      setPages(dashboardIds);
    });
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
      <DashboardModal />
    </div>
  );
};

export default Home;
