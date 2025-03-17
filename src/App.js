import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './components/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Main />
      </Router>
    </div>
  );
}

export default App;