import { useEffect, useState } from "react";

export const usePreview = (url) => {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = url;
    const onLoad = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 1;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      setCanvas(canvas);
    };
    video.addEventListener("canplay", onLoad);
    return () => video.removeEventListener("load", onLoad);
  }, [url]);

  return canvas;
};