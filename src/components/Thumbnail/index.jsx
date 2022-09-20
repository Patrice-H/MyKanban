import { Link } from 'react-router-dom';
import './Thumbnail.css';

const Thumbnail = (props) => {
  return (
    <Link to={`/dashboard/${props.pageId}`} className="thumbnail">
      <div className="mask"></div>
      <iframe
        title={`dashboard-${props.pageId}`}
        width="1200"
        height="500"
        src={`http://localhost:3000/dashboard/${props.pageId}`}
        scrolling="no"
      ></iframe>
    </Link>
  );
};

export default Thumbnail;
