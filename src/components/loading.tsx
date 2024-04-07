import { FC, useEffect, useState } from "react";
import '../styles/index.css'

export const Spinner: FC = () => {
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 10) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="spinner" style={{ transform: `rotate(${rotation}deg)` }}></div>
  );
};