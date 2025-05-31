import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './pages/map/map';
import Aboutus from './pages/aboutus/aboutus';
import FAQ from './pages/faq/faq';
import CafeReg from './pages/cafe_registr/cafereg';

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/map" element={<Map />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/register" element={<CafeReg />} />
        </Routes>
      </Router>
  );
}

export default App;
