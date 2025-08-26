import React from 'react';

function Section0({ isVisible }) {
  return (
    <section className={`section section0 ${!isVisible ? 'circle-shape' : ''}`}>
      <div>
        <h1>Welcome to Section 0</h1>
        <p>This is the introductory section.</p>
      </div>
    </section>
  );
}

export default Section0;
