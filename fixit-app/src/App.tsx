import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './pages/map/map';
import Aboutus from './pages/aboutus/aboutus';
import FAQ from './pages/faq/faq';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Router>
  );
}

export default App;
