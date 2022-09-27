import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { initialData } from './data/initialData';

const App = () => {
  const [dashboard, setDashboard] = useState(initialData);
  const [categories, setCategories] = useState();
  const [dbTasks, setDbTasks] = useState();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/dashboard/:dashboardId"
          element={
            <Dashboard
              dashboard={dashboard}
              categories={categories}
              dbTasks={dbTasks}
              setDbTasks={setDbTasks}
              setDashboard={setDashboard}
              setCategories={setCategories}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
