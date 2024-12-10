'use client';

import {BaseSyntheticEvent, useRef, useState} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

export const Animated = () => {
  const [isScrolling, setScrolling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const refWrapper = useRef<HTMLDivElement>(null);
  const refInner = useRef<HTMLDivElement>(null);
  const {contextSafe} = useGSAP({scope: refWrapper});
  const onScroll = contextSafe((e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (refWrapper.current === null || refInner.current === null || isScrolling) return;
    const totalCount = refInner.current.childElementCount;
    if (currentIndex === totalCount - 1) return;
    gsap.fromTo(refInner.current, {yPercent: (currentIndex) * -100}, {
      yPercent: (currentIndex + 1) * -100,
      duration: 0.4,
      onStart: () => {
        setScrolling(true)
        setCurrentIndex(currentIndex + 1)
        if (refWrapper.current === null) return;
        refWrapper.current.style.overflow = 'hidden';
      },
      onComplete: () => {
        setScrolling(false)
        if (refWrapper.current === null) return;
        refWrapper.current.style.overflow = 'scroll';
      }
    })
  })
  return (
    <div
      className="overflow-y-scroll"
      ref={refWrapper}
      onScroll={onScroll}
      onTouchMove={e => e.preventDefault()}
    >
      <div ref={refInner} className="transition-transform size-36 py-4 flex flex-col gap-4">
        <div className="size-32 bg-red-900 flex-shrink-0">Block 1</div>
        <div className="size-32 bg-red-900 flex-shrink-0">Block 2</div>
        <div className="size-32 bg-red-900 flex-shrink-0">Block 3</div>
      </div>
    </div>
  )
};