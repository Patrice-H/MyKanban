import { Link } from 'react-router-dom';
import CustomizedMenu from '../CustomizedMenu';
import './Thumbnail.css';

const Thumbnail = (props) => {
  return (
    <div className="thumbnail">
      <Link
        to={`/dashboard/${props.dashboardId}`}
        className="thumbnail-dashboard"
      >
        <div className="mask"></div>
        <iframe
          title={`dashboard-${props.dashboardId}`}
          width="1200"
          height="500"
          src={`http://localhost:3000/dashboard/${props.dashboardId}`}
          scrolling="no"
        ></iframe>
      </Link>
      <CustomizedMenu />
    </div>
  );
};

export default Thumbnail;
