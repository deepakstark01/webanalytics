import React, { useEffect } from "react";
// @ts-ignore
import ConfettiGenerator from "confetti-js";
export default function Confetti() {
  useEffect(() => {
    // const confettiSettings = { target: 'my-canvas' };
    const confettiSettings = {
      target: "my-canvas", // Replace with your target element ID
      max: "20",
      size: "4",
      animate: true,
      props: ["circle"],
      colors: [
        [165, 104, 246],
        [230, 61, 135],
        [0, 199, 228],
        [253, 214, 126],
      ],
      clock: "1",
      rotate: false,
      width: "1366",
      height: "681",
      start_from_edge: false,
      respawn: true,
      // max: '60',
      // size: '2',
      // animate: true,
      // props: ["circle", "square", "triangle", "line", { type: "svg", src: "site/hat.svg", size: 25, weight: 0.2 }],
      // // props: ["circle"],
      // colors: [
      //   [165, 104, 246],
      //   [230, 61, 135],
      //   [0, 199, 228],
      //   [253, 214, 126]
      // ],
      // clock: '1',
      // rotate: false,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []);

  return <canvas id="my-canvas"></canvas>;
}
