import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import InvoiceUpdater from './pages/InvoiceUpdater';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoice-updater" element={<InvoiceUpdater />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;