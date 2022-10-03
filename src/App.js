import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { initialData } from './data/initialData';

const App = () => {
  const [dashboard, setDashboard] = useState(initialData);
  const [dbData, setDbData] = useState({ categories: [], tasks: [] });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home setDashboard={setDashboard} setDbData={setDbData} />}
        ></Route>
        <Route
          path="/dashboard/:dashboardId"
          element={
            <Dashboard
              dashboard={dashboard}
              dbData={dbData}
              setDashboard={setDashboard}
              setDbData={setDbData}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
