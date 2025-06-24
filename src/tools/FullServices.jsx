import React, { useRef, useState, useEffect } from 'react';
import './FullService.css';
import ServiceLabel from './ServiceLabel';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const FullServices = () => {

  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className='fullservices'>
      <div className='top'>
        <label htmlFor="titleoftheservice" className='Dishes'>Dishes</label>
        <a href="">See all</a>
      </div>

      {showLeft && (
        <div className='toleft' onClick={() => scroll('left')}>
          <FaArrowLeft size={40} color="#ffffff" />
        </div>
      )}
      {showRight && (
        <div className='toright' onClick={() => scroll('right')}>
          <FaArrowRight size={40} color="#ffffff" />
        </div>
      )}

      <div className='services' ref={scrollRef}>
        <ServiceLabel />
        <ServiceLabel />
        <ServiceLabel />
        <ServiceLabel />
        <ServiceLabel />
        <ServiceLabel />
        <ServiceLabel />
      </div>
    </div>
  );
};

export default FullServices;