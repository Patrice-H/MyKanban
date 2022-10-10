import CustomizedMenu from '../CustomizedMenu';
import {
  getTasksList,
  getCategoriesList,
  removeTask,
  removeCategory,
  removeDashboard,
} from '../../services/dbManager';
import './Thumbnail.css';

const Thumbnail = (props) => {
  const setDisplayController = props.setDisplayController;
  const setDashboardForm = props.setDashboardForm;

  const deleteDashboard = async (id) => {
    const tasks = await getTasksList().then((data) => {
      return data.data.filter((task) => task.dashboard_id === id);
    });
    const categories = await getCategoriesList().then((data) => {
      return data.data.filter((category) => category.dashboard_id === id);
    });
    tasks.forEach((task) => removeTask(task.id));
    categories.forEach((category) => removeCategory(category.id));
    await removeDashboard(id);
    setDisplayController({
      dashboards: [],
      isDashboardsLoaded: false,
    });
  };

  return (
    <div className="thumbnail">
      <div className="thumbnail-dashboard">
        <div className="mask"></div>
        <iframe
          title={`dashboard-${props.dashboardId}`}
          width="1200"
          height="500"
          src={`http://localhost:3000/dashboard/${props.dashboardId}`}
          scrolling="no"
        ></iframe>
      </div>
      <CustomizedMenu
        item="dashboard"
        itemId={props.dashboardId}
        deleteItem={deleteDashboard}
        setDashboardForm={setDashboardForm}
      />
    </div>
  );
};

export default Thumbnail;
