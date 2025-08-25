import logo from './logo.svg';
import './App.css';
import { useRef, useEffect, useState } from 'react';

function App() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const scrollContainerRef = useRef(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [currentSection, setCurrentSection] = useState('section1');

  const scrollToSection = (ref, sectionName) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(sectionName);
  };

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Handle dropdown change
  const handleSelectChange = (e) => {
    const section = e.target.value;
    setCurrentSection(section);

    switch (section) {
      case 'section1':
        scrollToSection(section1Ref, section);
        break;
      case 'section2':
        scrollToSection(section2Ref, section);
        break;
      case 'section3':
        scrollToSection(section3Ref, section);
        break;
      case 'section4':
        scrollToSection(section4Ref, section);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">

      <nav className="nav">

        <div className="nav-buttons">
          <button onClick={() => scrollToSection(section1Ref, 'section1')}>Section 1</button>
          <button onClick={() => scrollToSection(section2Ref, 'section2')}>Section 2</button>
          <button onClick={() => scrollToSection(section3Ref, 'section3')}>Section 3</button>
          <button onClick={() => scrollToSection(section4Ref, 'section4')}>Section 4</button>
        </div>

        {/* Mobile dropdown */}
        <select
          className="nav-dropdown"
          value={currentSection}
          onChange={handleSelectChange}
          aria-label="Select section"
        >
          <option value="section1">Section 1</option>
          <option value="section2">Section 2</option>
          <option value="section3">Section 3</option>
          <option value="section4">Section 4</option>
        </select>
      </nav>

      {/* Scroll container */}
      <div
        ref={scrollContainerRef}
        className={`scroll-container ${isTouchDevice ? 'snap-enabled' : ''}`}
      >
        <section ref={section1Ref} className="section section1">
          <h1>Section 1</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </section>

        <section ref={section2Ref} className="section section2">
          <h1>Section 2</h1>
        </section>

        <section ref={section3Ref} className="section section3">
          <h1>Section 3</h1>
        </section>

        <section ref={section4Ref} className="section section4">
          <h1>Section 4</h1>
        </section>
      </div>
    </div>
  );
}

export default App;
