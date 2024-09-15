// src/components/shared/SharedDraggableComponent.tsx

import React from "react";
import { useDrag } from "react-dnd";

interface SharedDraggableComponentProps {
  component: {
    id: string;
    type: string;
    x: number;
    y: number;
    rotation?: number; // Optional for schematic components
    layer?: string; // Optional for schematic components
  };
  onRemove?: () => void;
  onPinClick?: (pinId: string) => void; // Optional for PCB components
  isPCB?: boolean; // Flag to handle PCB-specific rendering
}

const SharedDraggableComponent: React.FC<SharedDraggableComponentProps> = ({
  component,
  onRemove,
  onPinClick,
  isPCB = false,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: isPCB ? "pcb-component" : "schematic-component",
      item: {
        id: component.id,
        type: isPCB ? "pcb-component" : "schematic-component",
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [component.id, isPCB],
  );

  return (
    <div
      ref={drag}
      className={`absolute cursor-move rounded border bg-blue-300 p-4 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{
        top: `${component.y}${isPCB ? "mm" : "px"}`,
        left: `${component.x}${isPCB ? "mm" : "px"}`,
        transform: isPCB ? `rotate(${component.rotation}deg)` : undefined,
      }}
      title={`Type: ${component.type}`}
    >
      {component.type}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute right-0 top-0 text-sm text-red-500"
          title="Remove Component"
        >
          &times;
        </button>
      )}
      {/* Render Pins for PCB Components */}
      {isPCB && component.pins && (
        <>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform">
            {component.pins.map((pin: any) => (
              <div
                key={pin.id}
                onClick={() => onPinClick && onPinClick(pin.id)}
                className="m-1 h-2 w-2 cursor-pointer rounded-full bg-black"
                title={pin.name}
              ></div>
            ))}
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
            {component.pins.map((pin: any) => (
              <div
                key={pin.id}
                onClick={() => onPinClick && onPinClick(pin.id)}
                className="m-1 h-2 w-2 cursor-pointer rounded-full bg-black"
                title={pin.name}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SharedDraggableComponent;
