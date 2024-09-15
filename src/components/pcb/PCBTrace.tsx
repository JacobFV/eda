import React from "react";
import { TraceType } from "../../types/pcb";

interface PCBTraceProps {
  trace: TraceType;
}

const PCBTrace: React.FC<PCBTraceProps> = ({ trace }) => {
  const { path } = trace;

  if (path.length < 2) return null;

  const points = path.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <polyline
      points={points}
      stroke="black"
      strokeWidth="0.2mm"
      fill="none"
      markerEnd="url(#arrow)"
    />
  );
};

export default PCBTrace;
