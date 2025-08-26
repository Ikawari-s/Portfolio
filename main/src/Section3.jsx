import React from 'react';

function Section3({ isVisible }) {
  return (
    <section className="section section3">
      <div className={isVisible ? 'slide-in' : 'slide-out'}>
        <h1>Section 3</h1>
      </div>
    </section>
  );
}

export default Section3;
