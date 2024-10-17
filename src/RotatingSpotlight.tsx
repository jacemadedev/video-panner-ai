import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

interface RotatingSpotlightProps {
  imageUrl: string;
}

export const RotatingSpotlight: React.FC<RotatingSpotlightProps> = ({ imageUrl }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
  const scale = interpolate(frame, [0, durationInFrames / 2, durationInFrames], [1, 1.2, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#2D1B69' }}>
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `conic-gradient(from ${rotation}deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 60deg, transparent 300deg, rgba(255,255,255,0.1) 360deg)`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        margin: 'auto',
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
            transform: `scale(${scale})`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};