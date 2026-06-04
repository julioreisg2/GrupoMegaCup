"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGaleryProps {
  images: string[];
  productName: string;
}

export function ProductGalery({ images, productName }: ProductGaleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
      {/* Imagem principal */}
      <Image
        src={images[currentIndex]}
        alt={`${productName} - Foto ${currentIndex + 1}`}
        fill
        className="object-cover"
        priority
      />

      {/* Setas de navegação */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg transition-all hover:scale-110"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg transition-all hover:scale-110"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="rounded-full transition-all"
                style={{
                  width: idx === currentIndex ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: idx === currentIndex ? "var(--lime)" : "rgba(255,255,255,0.5)",
                }}
                aria-label={`Foto ${idx + 1}`}
              />
            ))}
          </div>

          {/* Contador */}
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-medium"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
          >
            {currentIndex + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}
