import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/homeComponents/homePage.js';

function App() {
  return (
    <>
      <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Router>
        </div>
    </>
  );
}

export default App;
