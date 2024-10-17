import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { ZoomPanVideo } from './ZoomPanVideo';
import { RotatingSpotlight } from './RotatingSpotlight';
import { ThreeDZoomCarousel } from './ThreeDZoomCarousel';
import { PerspectivePan } from './PerspectivePan';
import { HorizontalPan } from './HorizontalPan';
import { VerticalPan } from './VerticalPan';
import { ZoomInOut } from './ZoomInOut';
import { Upload } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';

const templates = [
  { name: 'Zoom and Pan', component: ZoomPanVideo },
  { name: 'Rotating Spotlight', component: RotatingSpotlight },
  { name: '3D Zoom Carousel', component: ThreeDZoomCarousel },
  { name: 'Perspective Pan', component: PerspectivePan },
  { name: 'Horizontal Pan', component: HorizontalPan },
  { name: 'Vertical Pan', component: VerticalPan },
  { name: 'Zoom In/Out', component: ZoomInOut },
];

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [duration, setDuration] = useState<5 | 15>(5);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-800">Screenshot to Video Converter</h1>
      <div className="mb-4">
        <label className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          <Upload className="inline-block mr-2" />
          Upload Screenshot
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
      </div>
      <div className="mb-4 flex space-x-4">
        <select
          className="bg-white border border-gray-300 rounded px-4 py-2"
          value={selectedTemplate.name}
          onChange={(e) => setSelectedTemplate(templates.find(t => t.name === e.target.value) || templates[0])}
        >
          {templates.map((template) => (
            <option key={template.name} value={template.name}>
              {template.name}
            </option>
          ))}
        </select>
        <select
          className="bg-white border border-gray-300 rounded px-4 py-2"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value) as 5 | 15)}
        >
          <option value={5}>5 seconds</option>
          <option value={15}>15 seconds</option>
        </select>
      </div>
      {selectedImage && (
        <ErrorBoundary>
          <Player
            component={selectedTemplate.component}
            inputProps={{ imageUrl: selectedImage, duration }}
            durationInFrames={duration * 30}
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            style={{
              width: '100%',
              maxWidth: '800px',
              aspectRatio: '16 / 9',
            }}
            controls
          />
        </ErrorBoundary>
      )}
    </div>
  );
};

export default App;