import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewCountStep1 from './pages/NewCountStep1';
import NewCountStep2 from './pages/NewCountStep2';
import NewCountStep3 from './pages/NewCountStep3';
import InventoryExecution from './pages/InventoryExecution';
import InventoryFinalization from './pages/InventoryFinalization';
import AuditProSetup from './pages/AuditProSetup';
import ProductRegistry from './pages/ProductRegistry';
import ProductManagement from './pages/ProductManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new-count/step-1" element={<NewCountStep1 />} />
        <Route path="/new-count/step-2" element={<NewCountStep2 />} />
        <Route path="/new-count/step-3" element={<NewCountStep3 />} />
        <Route path="/inventory/execution" element={<InventoryExecution />} />
        <Route path="/inventory/finalization" element={<InventoryFinalization />} />
        <Route path="/audit-pro/setup" element={<AuditProSetup />} />
        <Route path="/product/registry" element={<ProductRegistry />} />
        <Route path="/product/management" element={<ProductManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
