import React from 'react';
import logo from './logo.svg';

function Section1({ isVisible }) {
  return (
    <section className="section section1">
      <div className={isVisible ? 'slide-in' : 'slide-out'}>
        <h1>Section 1</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </section>
  );
}

export default Section1;
