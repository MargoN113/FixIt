import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './pages/map/map';
import Aboutus from './pages/aboutus/aboutus';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/about" element={<Aboutus />} />
        </Routes>
      </Router>
  );
}

export default App;
