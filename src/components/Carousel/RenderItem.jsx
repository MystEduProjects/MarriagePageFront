import React from "react";
import { interpolate } from "./interpolate";

const ITEM_HEIGHT = 194; // equivalente a hpx(194)
const HORIZONTAL_PADDING = 32; // equivalente a wpx(32)

// scrollX e itemWidth vienen de CustomCarousel: reemplazan al shared value `x`
// que en RN se compartía entre todos los items vía Reanimated.
const RenderItem = ({ item, index, scrollX = 0, itemWidth = 0 }) => {
  const opacityRaw = interpolate(
    scrollX,
    [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
    [-0.3, 1, -0.3]
  );

  // CSS no acepta opacity negativa (a diferencia de RN, donde interpolate
  // igual devuelve -0.3 sin romper nada); la clampeamos en 0.
  const opacity = Math.max(0, opacityRaw);

  return (
    <div className="w-full h-full">
      <img
        src={item.image}
        alt=""
        style={{
          opacity,
        }}
        className="object-cover object-top transition-opacity duration-100 w-full h-full"
      />
    </div>
  );
};

export default RenderItem;
