import { useLottie } from "lottie-react";
import React from "react";

const LoadingComponent = ({ animationData, size }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(defaultOptions);

  return <div style={{ width: size, height: size }}>{View}</div>;
};

export default LoadingComponent;
