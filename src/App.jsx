import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/Login/Login';
import RegistrationPage from './components/Register/Register';
import StatsPage from './components/Stats/Stats';

import styles from './styles/App.module.css';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <div className={styles.App}>
        <Header />
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/stats" element={<StatsPage />} />
        </Routes>
        <Footer />
    </div>
    );
}

export default App;