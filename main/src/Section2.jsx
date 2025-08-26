import React from 'react';

function Section2({ isVisible }) {
  return (
    <section className="section section2">
      <div className={isVisible ? 'slide-in' : 'slide-out'}>
        <h1>Section 2</h1>
      </div>
    </section>
  );
}

export default Section2;
