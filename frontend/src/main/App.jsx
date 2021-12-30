import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/templates/Footer';
import UserCrud from '../components/user/UserCrud';

export default (props) => (
  <BrowserRouter>
    <div>
      <UserCrud />
      <Footer />
    </div>
  </BrowserRouter>
);
