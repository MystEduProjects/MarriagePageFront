import React, { useCallback, useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import RenderItem from "./RenderItem";
import { images } from "./images";

const AUTOPLAY_INTERVAL = 4000;
const COUNT = images.length;

const LOOPED_DATA = [...images, ...images, ...images];

const CustomCarousel = () => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [scrollX, setScrollX] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const itemWidthRef = useRef(0);
  const isJumpingRef = useRef(false);

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

  useEffect(() => {
    const el = containerRef.current;
    if (!el || itemWidth === 0) return;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = itemWidth * COUNT;
    el.style.scrollBehavior = "";
    setScrollX(el.scrollLeft);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemWidth === 0]);

  const jumpTo = useCallback((el, index) => {
    isJumpingRef.current = true;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = itemWidthRef.current * index;
    el.style.scrollBehavior = "";
    requestAnimationFrame(() => {
      isJumpingRef.current = false;
    });
  }, []);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || itemWidthRef.current === 0 || isJumpingRef.current) return;

    setScrollX(el.scrollLeft);
    const rawIndex = Math.round(el.scrollLeft / itemWidthRef.current);
    setPaginationIndex(((rawIndex % COUNT) + COUNT) % COUNT);

    if (rawIndex < COUNT * 0.5) {
      jumpTo(el, rawIndex + COUNT);
    } else if (rawIndex >= COUNT * 2.5) {
      jumpTo(el, rawIndex - COUNT);
    }
  }, [jumpTo]);

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
    <div className="flex-1 w-full h-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onMouseDown={() => setIsAutoPlay(false)}
        onMouseUp={() => setIsAutoPlay(true)}
        onTouchStart={() => setIsAutoPlay(false)}
        onTouchEnd={() => setIsAutoPlay(true)}
        // aspect-[9/16] en mobile, aspect-video (16:9) desde md: la altura
        // se recalcula sola según el ancho, sin necesitar un alto fijo en px.
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none w-full aspect-[9/16] md:aspect-video"
      >
        {LOOPED_DATA.map((item, index) => (
          <div key={`list_item${index}`} className="snap-start shrink-0 w-full h-full">
            <RenderItem item={item} index={index} scrollX={scrollX} itemWidth={itemWidth} />
          </div>
        ))}
      </div>
      <Pagination paginationIndex={paginationIndex} />
    </div>
  );
};

export default CustomCarousel;
