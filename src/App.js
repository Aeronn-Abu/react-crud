import './App.css';
import React, { useEffect } from 'react';
import CrudTable from './components/CrudTable';

function App() {
  useEffect(() => {
    document.title = "React CRUD";
  }, []);
  
  return (
    <div className="App">
      <CrudTable />
    </div>
  );
}

export default App;
