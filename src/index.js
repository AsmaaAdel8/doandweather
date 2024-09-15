import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import Weather from './weather/Weather';
import MasterLayout from './MasterLayout';
// import AlertDialogSlide from './weather/login'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<MasterLayout/>}>
          <Route index element={<App/>}/>
          <Route path='Weather' element={<Weather/>}/>
          {/* <Route path='login' element={<AlertDialogSlide/>}/> */}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// "homepage": "https://github.com/AsmaaAdel8/TodoList.git", i delete it from packege.json