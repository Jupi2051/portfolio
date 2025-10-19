const LiquidGlass = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      className="overflow-hidden absolute"
    >
      <defs>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          ></feTurbulence>
          <feGaussianBlur
            in="noise"
            stdDeviation="2"
            result="blurred"
          ></feGaussianBlur>
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="80"
            xChannelSelector="R"
            yChannelSelector="G"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlass;
