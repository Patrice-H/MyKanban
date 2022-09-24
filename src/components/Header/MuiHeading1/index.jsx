import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getDashboard } from '../../../services/dbManager';

const MuiHeading1 = (props) => {
  const [dashboardTitle, setDashboardTitle] = useState();
  useEffect(() => {
    getDashboard(props.dashboardId).then((data) => {
      setDashboardTitle(data.data.title);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: '36px',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px',
      }}
    >
      {dashboardTitle && dashboardTitle}
    </Typography>
  );
};

export default MuiHeading1;
