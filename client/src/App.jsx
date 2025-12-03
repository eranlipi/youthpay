import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import UploadPayslip from './pages/UploadPayslip'
import ContractAnalyzer from './pages/ContractAnalyzer'
import RightsChecker from './pages/RightsChecker'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload-payslip" element={<UploadPayslip />} />
          <Route path="/contract-analyzer" element={<ContractAnalyzer />} />
          <Route path="/rights-checker" element={<RightsChecker />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
