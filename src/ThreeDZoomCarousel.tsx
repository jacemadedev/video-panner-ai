import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

interface ThreeDZoomCarouselProps {
  imageUrl: string;
}

export const ThreeDZoomCarousel: React.FC<ThreeDZoomCarouselProps> = ({ imageUrl }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();

  const progress = frame / durationInFrames;
  const rotateY = interpolate(progress, [0, 1], [0, 360]);
  const zoom = interpolate(progress, [0, 0.5, 1], [1, 1.5, 1], {
    extrapolateRight: 'clamp',
  });

  const createPanel = (index: number) => {
    const panelRotateY = rotateY + index * 120;
    const panelOpacity = Math.cos((panelRotateY * Math.PI) / 180) * 0.5 + 0.5;
    const panelScale = Math.cos((panelRotateY * Math.PI) / 180) * 0.3 + 0.7;

    return (
      <div
        key={index}
        style={{
          position: 'absolute',
          width: '65%',
          height: '65%',
          left: '17.5%',
          top: '17.5%',
          transform: `rotateY(${panelRotateY}deg) translateZ(${width * 0.3}px) scale(${panelScale})`,
          opacity: panelOpacity,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '10px solid white',
        }}
      >
        <img
          src={imageUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#2D1B69',
        perspective: '1000px',
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
          transform: `scale(${zoom})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {[0, 1, 2].map(createPanel)}
      </div>
    </AbsoluteFill>
  );
};