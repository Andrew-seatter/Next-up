
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import LoginPage from "./components/Login/Login";
import RegistrationPage from "./components/Register/Register";
import StatsPage from "./components/Stats/Stats";
import ResourcesPage from "./components/Resources/Resources";
import AllJobsPage from './components/AllJobs/AllJobs';
import Home from "./components/HomePage/Home"

import { Footer } from "./components/Footer/Footer";
import EditModal from './components/Dashboard/EditModal.jsx'

import { Modal, Box } from "@mui/material";

import { useStore, updateStore } from "./lib/store.js";

import auth from "../utils/auth.js";

function App() {
  const [store, setStore] = useStore()

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path='/allJobs' element = {<AllJobsPage/>} />
      </Routes>
      <Footer />

      <Modal
        open={store.editModalIsOpen}
      >
        <Box className="modal-box">
          <EditModal
            close={()=>{
              updateStore(setStore, 'editModalIsOpen', false)
              updateStore(setStore, 'activeJob', null)
          }}
          />
        </Box>
      </Modal>

    </div>
  );
}

export default App;
