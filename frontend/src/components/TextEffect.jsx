import React, { useEffect } from 'react';
import "./textEffect.css";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TextEffects = ({ mainText, spanText, textStyles }) => {
  useEffect(() => {
    const textElements = gsap.utils.toArray('.text');

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
    <h1 className={`text ${textStyles}`}>
      {mainText}<span className='spanText'>{spanText}</span>
    </h1>
  );
};

export default TextEffects;
