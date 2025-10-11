import React from 'react';

function Section1({ isVisible }) {
  return (
    <section className="section section1">
      <div className={isVisible ? 'slide-in' : 'slide-out'}>
        <h1>Section 1</h1>
      </div>
    </section>
  );
}

export default Section1;
