import React from 'react';
import img from '../assets/img/CRONOS-logo-white.png';

export default (props) => (
  <header>
    <div className="container">
      <a href="#">
        <img src={img} alt="Agência CRONOS" />
      </a>
      <h1>Painel administrativo</h1>
    </div>
  </header>
);
