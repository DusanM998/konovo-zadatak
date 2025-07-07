import { useEffect, useState } from 'react';
import logo from '../../assets/images/konovo_logo.jpg'
import './MainLoader.css';

export default function MainLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 50); // da animacija ima efekat
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-container">
      <div className="logo-wrapper">
        <img
          src={logo}
          alt="Konovo logo"
          className="logo-base"
        />
        <div className={`logo-overlay ${show ? 'reveal-animation' : ''}`}>
          <img
            src={logo}
            alt="Konovo logo animated"
            className="logo-top"
          />
        </div>
      </div>
    </div>
  );
}
