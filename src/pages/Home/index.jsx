import { useState, useEffect } from 'react';
import Thumbnail from '../../components/Thumbnail';
import { getDashboardsList } from '../../services/dbManager';

const Home = () => {
  const [pages, setPages] = useState();

  useEffect(() => {
    let dashboardIds = [];
    getDashboardsList().then((data) => {
      data.data.forEach((item) => dashboardIds.push(item.id));
      setPages(dashboardIds);
    });
  }, []);

  return (
    <div>
      <h1 className="main-title">Tableaux de bord</h1>
      {pages &&
        pages.map((page) => (
          <Thumbnail key={`thumbnail-${page}`} pageId={page} />
        ))}
    </div>
  );
};

export default Home;
