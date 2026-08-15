import React, { useCallback, useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import RenderItem from "./RenderItem";
import { images } from "./images";

const AUTOPLAY_INTERVAL = 4000;
const ITEM_HEIGHT = 194; // equivalente a hpx(194)

const CustomCarousel = () => {
  const [data, setData] = useState(images);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [scrollX, setScrollX] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const itemWidthRef = useRef(0);

  // Mide el ancho real de cada item (equivalente a useWindowDimensions().width,
  // pero basado en el contenedor, que es más confiable en web)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      itemWidthRef.current = el.clientWidth;
      setItemWidth(el.clientWidth);
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  // Detecta qué item está visible según el scroll (equivalente a onViewableItemsChanged)
  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || itemWidthRef.current === 0) return;
    setScrollX(el.scrollLeft);
    const index = Math.round(el.scrollLeft / itemWidthRef.current);
    setPaginationIndex(((index % images.length) + images.length) % images.length);

    // onEndReached: si estamos cerca del final, agregamos más data (loop infinito simulado)
    const distanceToEnd = el.scrollWidth - (el.scrollLeft + el.clientWidth);
    if (distanceToEnd < itemWidthRef.current * (images.length * 0.5)) {
      setData((prev) => [...prev, ...images]);
    }
  }, []);

  // Autoplay: avanza un item cada AUTOPLAY_INTERVAL ms (equivalente a offset.value += width)
  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollTo({
          left: el.scrollLeft + itemWidthRef.current,
          behavior: "smooth",
        });
      }, AUTOPLAY_INTERVAL);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay]);

  return (
    <div className="flex-1">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={() => setIsAutoPlay(false)}
        onMouseUp={() => setIsAutoPlay(true)}
        onTouchStart={() => setIsAutoPlay(false)}
        onTouchEnd={() => setIsAutoPlay(true)}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ height: ITEM_HEIGHT, flexGrow: 0 }}
      >
        {data.map((item, index) => (
          <div key={`list_item${index}`} className="snap-start shrink-0 w-full">
            <RenderItem item={item} index={index} scrollX={scrollX} itemWidth={itemWidth} />
          </div>
        ))}
      </div>
      <Pagination paginationIndex={paginationIndex} />
    </div>
  );
};

export default CustomCarousel;
