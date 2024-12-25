// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Pages/Home";
import TermsPage from "./Pages/Terms";
import ClientDashboard from "./Pages/ClientDashboard";

import PrivacyPage from "./Pages/Privacy";


import "./styles.css";

import JobPostForm from "./Pages/JobPostForm";
import ClientSignIn from "./Pages/ClientSignIn";
import ClientSignUp from "./Pages/ClientSignUp";
import TradesSignUp from "./Pages/TradesSignUp";
import TradesSignIn from "./Pages/TradesSignIn";
import TradespersonDashboard from "./Pages/TradepersonDashboard";
import QuotationForm from './Pages/QuotationForm';
import AppliedJobs from './Pages/AppliedJobs';
import ManageTradespeople from "./Pages/ManageTradespeople";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from './Pages/AdminLogin';
import ManageClients from './Pages/manageClients';
import ManageJobs from './Pages/ManageJobs';
import JobDescription from "./Pages/jobDescription";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/Terms" element={<TermsPage />} />
        <Route path="/Privacy" element={<PrivacyPage />} />
        <Route path="/signup" element={<ClientSignUp/>}/>
      
      +
       <Route path="/signin" element={<ClientSignIn/>}/>
      
        <Route path="/post-job" element={<JobPostForm/>} />
       
        
        <Route path="/client-dashboard" element={<ClientDashboard/>} />
        <Route path="/register" element={<TradesSignUp/>} />

        <Route path="/login" element={<TradesSignIn/>} />

        <Route path="/dashboard" element={<TradespersonDashboard/>} />

        <Route path="/apply/:jobId" element={<QuotationForm />} />

        <Route path="/applied-jobs" element={<AppliedJobs />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/tradespeople" element={<ManageTradespeople />} />
                <Route path="/admin/login" element={<AdminLogin/>} />
                <Route path="/admin/manage-clients" element={<ManageClients/>} />
                <Route path="/admin/manage-jobs" element={<ManageJobs/>} />

                <Route path="/job-description" element={<ManageJobs/>} />

       
      </Routes>
      <Footer />
      {/* <MultiStepForm onClose={() => {}} /> */}
    </div>
  );
}

export default App;
