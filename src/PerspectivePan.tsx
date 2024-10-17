import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

interface PerspectivePanProps {
  imageUrl: string;
}

export const PerspectivePan: React.FC<PerspectivePanProps> = ({ imageUrl }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const progress = frame / durationInFrames;
  const rotateX = interpolate(progress, [0, 0.5, 1], [-15, 15, -15]);
  const rotateY = interpolate(progress, [0, 0.5, 1], [-15, 15, -15]);
  const translateZ = interpolate(progress, [0, 0.5, 1], [-100, 0, -100]);
  const scale = interpolate(progress, [0, 0.5, 1], [1.2, 1, 1.2]);

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
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div style={{
          width: '85%',
          height: '85%',
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
          background: `linear-gradient(135deg, 
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