import Heading1 from './Heading1';

const Header = (props) => {
  const setDashboard = props.setDashboard;
  const setEditedTask = props.setEditedTask;
  const setInputEntry = props.setInputEntry;

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
    setInputEntry('');
  };

  const updateTask = (taskId) => {
    const newTasksList = {
      ...props.dashboard.tasks,
      [taskId]: {
        id: taskId,
        content: props.inputEntry,
      },
    };

    const newDashboard = {
      ...props.dashboard,
      tasks: newTasksList,
    };

    setDashboard(newDashboard);
    setEditedTask();
    setInputEntry('');
  };

  return (
    <section className="header">
      <Heading1 />
      <div className="task-form">
        {props.editedTask === undefined ? (
          <>
            <label htmlFor="task-input">Ajouter une tâche</label>
            <input
              type="text"
              id="task-input"
              value={props.inputEntry}
              onChange={(e) => setInputEntry(e.target.value)}
            />
            <button onClick={addTask}>Ajouter</button>
          </>
        ) : (
          <>
            <label htmlFor="task-input">Modifier la tâche</label>
            <input
              type="text"
              id="task-input"
              value={props.inputEntry}
              onChange={(e) => setInputEntry(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                updateTask(props.editedTask);
              }}
            >
              Modifier
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Header;
