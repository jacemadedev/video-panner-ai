import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

interface VerticalPanProps {
  imageUrl: string;
}

export const VerticalPan: React.FC<VerticalPanProps> = ({ imageUrl }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, height } = useVideoConfig();

  const progress = frame / durationInFrames;
  const translateY = interpolate(progress, [0, 1], [-height * 0.2, height * 0.2]);
  const rotateX = interpolate(progress, [0, 0.5, 1], [5, 0, 5]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#2D1B69',
        perspective: '1000px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `translateY(${translateY}px) rotateX(${rotateX}deg)`,
          transformOrigin: 'center center',
        }}
      >
        <div style={{
          width: '85%',
          height: '95%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '10px solid white',
        }}>
          <img
            src={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, 
            rgba(74, 14, 78, 0.7) 0%, 
            rgba(129, 38, 123, 0.7) 50%, 
            rgba(74, 14, 78, 0.7) 100%)`,
          opacity: 0.5,
          mixBlendMode: 'overlay',
        }}
      />
    </AbsoluteFill>
  );
};