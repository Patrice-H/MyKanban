import CustomizedMenu from '../CustomizedMenu';
import {
  getTasksList,
  getCategoriesList,
  removeTask,
  removeCategory,
  removeDashboard,
} from '../../services/dbManager';
import './Thumbnail.css';

/**
 * Thumbnail component
 *
 * @component
 * @description It renders a dashboard in thumbnail.
 * @param {object} props The props component
 * @returns The React component.
 */
const Thumbnail = (props) => {
  const setDisplayController = props.setDisplayController;
  const setDashboardForm = props.setDashboardForm;

  /**
   * Function to delete a dashboard
   *
   * @async
   * @description Delete a dashboard, and all of its tasks and categories, from the database.
   * @param {number} id The dashboard id
   */
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
          title={`dashboard-${props.dashboard.id}`}
          width="1200"
          height="500"
          src={`http://localhost:3000/dashboard/${props.dashboard.id}`}
          scrolling="no"
        ></iframe>
      </div>
      <CustomizedMenu
        itemType="dashboard"
        item={props.dashboard}
        isCardExpanded={false}
        deleteItem={deleteDashboard}
        setModalType={props.setModalType}
        setDashboardForm={setDashboardForm}
        setTaskForm={null}
        setIsCardExpanded={null}
      />
    </div>
  );
};

export default Thumbnail;
