// https://mui.com/material-ui/
// npm install @mui/material @emotion/react @emotion/styled react-router-dom

import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/Login/Login';
import RegistrationPage from './components/Register/Register';
import StatsPage from './components/Stats/Stats'; 
import ResourcesPage from './components/Resources/Resources';


import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
      <div>
        <Header />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
        <Footer />
      </div>
    );
}

export default App;