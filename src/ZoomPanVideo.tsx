import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

interface ZoomPanVideoProps {
  imageUrl: string;
  duration: 5 | 15;
}

export const ZoomPanVideo: React.FC<ZoomPanVideoProps> = ({ imageUrl, duration }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const speedFactor = 5 / duration; // Adjust speed based on duration
  const progress = (frame / durationInFrames) * speedFactor;

  const scale = interpolate(progress % 1, [0, 0.5, 1], [1.2, 1.5, 1.2]);
  const translateX = interpolate(progress % 1, [0, 1], [-width * 0.1, width * 0.1]);
  const translateY = interpolate(progress % 1, [0, 0.5, 1], [-height * 0.05, height * 0.05, -height * 0.05]);
  const rotateX = interpolate(progress % 1, [0, 0.5, 1], [-5, 0, -5]);
  const rotateY = interpolate(progress % 1, [0, 0.5, 1], [-3, 3, -3]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#2D1B69', perspective: '1000px' }}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}>
        <div style={{
          width: '90%',
          height: '90%',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
        }}>
          <img
            src={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, 
            rgba(74, 14, 78, 0.5) 0%, 
            rgba(129, 38, 123, 0.5) 50%, 
            rgba(74, 14, 78, 0.5) 100%)`,
          opacity: 0.5,
          mixBlendMode: 'overlay',
        }}
      />
    </AbsoluteFill>
  );
};