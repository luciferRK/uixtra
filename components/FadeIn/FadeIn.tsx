import React from 'react';
import './FadeIn.scss';
import { FadeInProps } from './FadeIn.types';

const FadeIn: React.FC<FadeInProps> = (props) => {
  const { children, duration = 0, className } = props;

  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      className={`uixtra-fade-in-wrapper transition-all duration-700 ease-out',
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'},
        ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
