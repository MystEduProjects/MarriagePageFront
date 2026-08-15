import React from "react";
import { interpolate } from "./interpolate";

// scrollX e itemWidth vienen de CustomCarousel: reemplazan al shared value `x`
// que en RN se compartía entre todos los items vía Reanimated.
const RenderItem = ({ item, index, scrollX = 0, itemWidth = 0 }) => {
  const opacityRaw = interpolate(
    scrollX,
    [(index - 1) * itemWidth, index * itemWidth, (index + 1) * itemWidth],
    [-0.3, 1, -0.3]
  );

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
