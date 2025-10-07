import './App.css';
import { useRef, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import LoadingScreen from './LoadingScreen';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';

// Hook to detect section visibility
function useVisibilityObserver(ref, threshold = 0.5) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isVisible;
}

function App() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const cursorRef = useRef(null);
  const lenisRef = useRef(null);

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [currentSection, setCurrentSection] = useState('section1');

  const section1Visible = useVisibilityObserver(section1Ref);
  const section2Visible = useVisibilityObserver(section2Ref);
  const section3Visible = useVisibilityObserver(section3Ref);
  const section4Visible = useVisibilityObserver(section4Ref);

  // Detect touch device and conditionally setup Lenis
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);

    if (hasTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Scroll to section
  const scrollToSection = (ref, sectionName) => {
    if (lenisRef.current && ref.current && !isTouchDevice) {
      lenisRef.current.scrollTo(ref.current);
    } else {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSection(sectionName);
  };

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

    const updateCursor = () => {
      posX += (mouseX - posX) * 0.5;
      posY += (mouseY - posY) * 0.5;
      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
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
      <LoadingScreen />

      <div className="custom-cursor" ref={cursorRef}></div>

      <nav className="nav">
        <div className="nav-buttons">
          <button onClick={() => scrollToSection(section1Ref, 'section1')}>Section 1</button>
          <button onClick={() => scrollToSection(section2Ref, 'section2')}>Section 2</button>
          <button onClick={() => scrollToSection(section3Ref, 'section3')}>Section 3</button>
          <button onClick={() => scrollToSection(section4Ref, 'section4')}>Section 4</button>
        </div>

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

      <div className={`scroll-container ${isTouchDevice ? 'snap-enabled' : ''}`}>
        <div ref={section1Ref}>
          <Section1 isVisible={section1Visible} />
        </div>
        <div ref={section2Ref}>
          <Section2 isVisible={section2Visible} />
        </div>
        <div ref={section3Ref}>
          <Section3 isVisible={section3Visible} />
        </div>
        <div ref={section4Ref}>
          <Section4 isVisible={section4Visible} />
        </div>
      </div>
    </div>
  );
}

export default App;
