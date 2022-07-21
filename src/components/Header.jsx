const Header = (props) => {
  const setDashboard = props.setDashboard;

  const addTask = () => {
    const newTask = document.getElementById('task-input').value;
    const tasksListCount = Object.keys(props.dashboard.tasks).length;
    const newTaskId = 'task-' + (tasksListCount + 1);

    if (newTask === '') {
      return;
    }

    const newTasksList = {
      ...props.dashboard.tasks,
      [newTaskId]: {
        id: newTaskId,
        content: newTask,
      },
    };

    const newTaskListIds = Array.from(
      props.dashboard.columns['column-1'].taskIds
    );
    newTaskListIds.splice(tasksListCount, 0, newTaskId);

    const newColumns = {
      ...props.dashboard.columns,
      'column-1': {
        ...props.dashboard.columns['column-1'],
        taskIds: newTaskListIds,
      },
    };

    const newDashboard = {
      ...props.dashboard,
      tasks: newTasksList,
      columns: newColumns,
    };

    setDashboard(newDashboard);
  };

  return (
    <section className="header">
      <h1>Mon Kanban</h1>
      <div className="task-form">
        <label htmlFor="task-input">Ajouter une tâche</label>
        <input type="text" id="task-input" />
        <button onClick={addTask}>Ajouter</button>
      </div>
    </section>
  );
};

export default Header;
