import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Navigator from './components/navigation/Navigator';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigator/>
      </BrowserRouter>
    </div>
  );
}

export default App;
