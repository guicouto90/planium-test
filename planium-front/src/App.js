import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterBeneficiaries from './pages/RegisterBeneficiaries';
import ListProposal from './pages/ListProposal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register-beneficiaries" element={ <RegisterBeneficiaries /> }/>
        <Route path="/" element={<Navigate replace to="/register-beneficiaries"/>} />
        <Route path="/list-proposal" element={ <ListProposal /> }/>
      </Routes>
    </Router>
  );
}

export default App;
