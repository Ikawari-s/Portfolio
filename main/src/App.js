import logo from './logo.svg';
import './App.css';
import { useRef, useEffect, useState } from 'react';

// Custom hook for visibility detection using Intersection Observer
function useVisibilityObserver(ref, threshold = 0.5) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isVisible;
}

function App() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const scrollContainerRef = useRef(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [currentSection, setCurrentSection] = useState('section1');

  // Use custom hook for each section's visibility
  const section1Visible = useVisibilityObserver(section1Ref);
  const section2Visible = useVisibilityObserver(section2Ref);
  const section3Visible = useVisibilityObserver(section3Ref);
  const section4Visible = useVisibilityObserver(section4Ref);

  const scrollToSection = (ref, sectionName) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(sectionName);
  };

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

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

      <div
        ref={scrollContainerRef}
        className={`scroll-container ${isTouchDevice ? 'snap-enabled' : ''}`}
      >
        <section ref={section1Ref} className="section section1">
          <div className={section1Visible ? 'slide-in' : 'slide-out'}>
            <h1>Section 1</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </section>

        <section ref={section2Ref} className="section section2">
          <div className={section2Visible ? 'slide-in' : 'slide-out'}>
            <h1>Section 2</h1>
          </div>
        </section>

        <section ref={section3Ref} className="section section3">
          <div className={section3Visible ? 'slide-in' : 'slide-out'}>
            <h1>Section 3</h1>
          </div>
        </section>

        <section ref={section4Ref} className="section section4">
          <div className={section4Visible ? 'slide-in' : 'slide-out'}>
            <h1>Section 4</h1>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
