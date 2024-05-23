'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin);

export default function AnimatedText({ textArray = [], ...props }) {
  const ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    textArray.forEach((text) => {
      tl.to(ref.current, { duration: 1.5, text }).to(ref.current, {
        duration: 1,
        delay: 0.5,
        text: ''
      });
    });
  }, []);

  return (
    <>
      <h1 className="sr-only">
        {textArray.map((text, i) =>
          text + i === textArray.length - 1 ? '' : ','
        )}
      </h1>
      <h1 ref={ref} {...props}></h1>
    </>
  );
}
