import React from 'react';
import Calculator from '../Calculator';

const Home = () => {
  return (
    <div data-easytag="id1-react/src/components/Home/index.jsx" className="home">
      <div className="home__container">
        <h1 className="home__title">Простой калькулятор</h1>
        <p className="home__subtitle">Десктопная версия</p>
        <Calculator />
      </div>
    </div>
  );
};

export default Home;
