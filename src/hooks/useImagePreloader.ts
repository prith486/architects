import { useState, useEffect } from 'react';

interface PreloaderOptions {
  prefix?: string;
  extension?: string;
  offset?: number;
  padLength?: number;
}

export const useImagePreloader = (framePath: string, frameCount: number, options?: PreloaderOptions) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];
    const prefix = options?.prefix ?? 'frame_';
    const extension = options?.extension ?? 'webp';
    const offset = options?.offset ?? 0;
    const padLength = options?.padLength ?? 4;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const paddedIndex = (i + offset).toString().padStart(padLength, '0');
      img.src = `${framePath}/${prefix}${paddedIndex}.${extension}`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      // In case of error, just skip it to prevent getting stuck
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) setLoaded(true);
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, [framePath, frameCount, options?.prefix, options?.extension, options?.offset, options?.padLength]);

  return { images, loaded };
};
