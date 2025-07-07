import React, { useRef, useState, useEffect } from 'react';
import './FullService.css';
import ServiceLabel from './ServiceLabel';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const FullServices = (props) => {

  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [plates, setPlates] = useState([]);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    autoScrollRef.current = setInterval(() => {
      el.scrollBy({ left: 2 });
    }, 10);

    return () => clearInterval(autoScrollRef.current);
  }, []);

  const stopAutoScroll = () => {
    clearInterval(autoScrollRef.current);
  };

  const scroll = (direction) => {
    stopAutoScroll(); 
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  

  useEffect(() => {
    axios.get("http://localhost:3001/getPlates")
      .then((res) => {
        setPlates(res.data.plates);
      })
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <div className='fullservices'>
      <div className='top'>
        <label htmlFor="titleoftheservice" className='Dishes'>{props.name}</label>
        <a className="a" href="">See all</a>
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
        {plates.map((plate)=>(
        <ServiceLabel
      key={plate._id}
      name={plate.name}
      description={plate.description}
      price={plate.price}
      type={plate.type}
      image={plate.image}
        />
        )
      )}
      </div>
    </div>
  );
};

export default FullServices;
