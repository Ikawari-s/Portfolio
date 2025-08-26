import React from 'react';

function Section4({ isVisible }) {
  return (
    <section className="section section4">
      <div className={isVisible ? 'slide-in' : 'slide-out'}>
        <h1>Section 4</h1>
      </div>
    </section>
  );
}

export default Section4;
