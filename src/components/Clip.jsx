'use client'

import { useState } from "react";

export const Clip = () => {
    const video = 'video.mp4'
    return (
        <video key={video} autoPlay loop muted playsInline>
          <source src={video} />
        </video>
    );
}
