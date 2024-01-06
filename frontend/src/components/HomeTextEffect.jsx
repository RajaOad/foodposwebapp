import React, { useEffect } from 'react';
import "./homeTextEffect.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomeTextEffects = ({ mainText, spanText, textStyles }) => {
  useEffect(() => {
    const textElements = gsap.utils.toArray('.homeText');

    textElements.forEach((text) => {
      gsap.to(text, {
        backgroundSize: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: text,
          start: 'center 80%',
          end: 'center 20%',
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <h1 className={`homeText ${textStyles}`}>
      {mainText}<span className='spanHomeText'>{spanText}</span>
    </h1>
  );
};

export default HomeTextEffects;
