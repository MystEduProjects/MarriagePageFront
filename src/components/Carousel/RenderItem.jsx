import React from "react";
import { interpolate } from "./interpolate";

const MOBILE_BREAKPOINT = 768; // debe coincidir con el "md:" de Tailwind

const RenderItem = ({ item, index, scrollX = 0, itemWidth = 0 }) => {
  const opacityRaw = interpolate(
    scrollX,
    [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
    [-0.3, 1, -0.3]
  );
  const opacity = Math.max(0, opacityRaw);

  return (
    <div className="w-full h-full">
      <picture>
        {/* El navegador evalúa los <source> de arriba hacia abajo y descarga
            SOLO el primero que matchea: nunca pide las dos imágenes. */}
        <source
          media={`(min-width: ${MOBILE_BREAKPOINT}px)`}
          srcSet={item.desktopImage}
        />
        <img
          src={item.mobileImage}
          alt=""
          style={{
            opacity,
          }}
          className="w-full h-full object-cover object-top mx-auto transition-opacity duration-100"
        />
      </picture>
    </div>
  );
};

export default RenderItem;
