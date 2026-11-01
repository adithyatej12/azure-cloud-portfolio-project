"use client";

/**
 * @file components/ui/ProjectGallery.tsx
 * @description Interactive multi-screenshot image gallery carousel & modal lightbox component for project detail pages.
 */

import { useState } from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImage: string = images[currentIndex] || images[0] || "";
  if (!currentImage) return null;

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="my-10 w-full flex flex-col space-y-4">
      {/* Featured Main Image Showcase */}
      <div
        className="relative w-full aspect-[16/9] min-h-[320px] max-h-[520px] rounded-2xl overflow-hidden border border-zinc-800/90 shadow-2xl bg-[#060608] group cursor-pointer flex items-center justify-center p-2 sm:p-4"
        onClick={() => setIsFullscreen(true)}
      >
        <Image
          src={currentImage}
          alt={`${title} Screenshot ${currentIndex + 1}`}
          fill
          className="object-contain hover:scale-[1.01] transition-transform duration-300 drop-shadow-xl"
          unoptimized={true}
          priority
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Navigation Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Screenshot"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-zinc-700/80 text-amber hover:bg-amber hover:text-black flex items-center justify-center transition-all shadow-lg backdrop-blur-md opacity-80 group-hover:opacity-100"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Screenshot"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-zinc-700/80 text-amber hover:bg-amber hover:text-black flex items-center justify-center transition-all shadow-lg backdrop-blur-md opacity-80 group-hover:opacity-100"
            >
              →
            </button>
          </>
        )}

        {/* Badge & Counter Overlay */}
        <div className="absolute bottom-4 left-4 z-10 flex flex-wrap items-center gap-2">
          <div className="bg-black/85 backdrop-blur-md border border-zinc-800 px-3.5 py-1.5 rounded-lg text-xs font-mono text-amber shadow-lg flex items-center gap-2">
            <span>🖼️</span>
            <span className="font-semibold uppercase tracking-wider">
              {title} — Screenshot {currentIndex + 1} of {images.length}
            </span>
          </div>
          <span className="bg-zinc-900/90 text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded-lg text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            Click to Expand 🔍
          </span>
        </div>
      </div>

      {/* Thumbnails Strip (if multiple images) */}
      {images.length > 1 && (
        <div className="w-full flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-[#0a0a0c] p-1 ${
                idx === currentIndex
                  ? "border-amber shadow-lg shadow-amber/20 scale-105"
                  : "border-zinc-800/80 opacity-60 hover:opacity-100 hover:border-zinc-600"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-contain"
                unoptimized={true}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal Lightbox */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <span className="font-mono text-sm text-amber font-bold uppercase tracking-wider">
              {title} — Interface Screenshot {currentIndex + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="bg-zinc-900 border border-zinc-700 text-white hover:text-amber px-4 py-2 rounded-lg font-mono text-xs uppercase"
            >
              Close ✕
            </button>
          </div>

          {/* Center Image */}
          <div
            className="relative w-full h-[75vh] max-w-6xl mx-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage}
              alt={`${title} Fullscreen Screenshot`}
              fill
              className="object-contain"
              unoptimized={true}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  type="button"
                  aria-label="Previous Screenshot"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 border border-zinc-700 text-amber hover:bg-amber hover:text-black flex items-center justify-center font-bold text-lg shadow-xl"
                >
                  ←
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  aria-label="Next Screenshot"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 border border-zinc-700 text-amber hover:bg-amber hover:text-black flex items-center justify-center font-bold text-lg shadow-xl"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          {images.length > 1 && (
            <div
              className="flex justify-center gap-2 overflow-x-auto py-2"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-10 rounded-lg overflow-hidden border ${
                    idx === currentIndex
                      ? "border-amber ring-2 ring-amber/50"
                      : "border-zinc-800 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    fill
                    className="object-cover object-top"
                    unoptimized={true}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
