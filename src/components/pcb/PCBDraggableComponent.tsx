// src/components/pcb/PCBDraggableComponent.tsx

import React from "react";
import { useDrag } from "react-dnd";
import { usePCBEditorStore } from "../../context/PCBEditorContext";
import { ComponentType, PinType } from "../../types/pcb";

interface PCBDraggableComponentProps {
  component: ComponentType;
  onPinClick: (componentId: string, pinId: string) => void;
}

const PCBDraggableComponent: React.FC<PCBDraggableComponentProps> = ({
  component,
  onPinClick,
}) => {
  const updateComponent = usePCBEditorStore((state) => state.updateComponent);
  const removeComponent = usePCBEditorStore((state) => state.removeComponent);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "existing-pcb-component",
      item: { id: component.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [component.id],
  );

  const handleDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const origX = component.x;
    const origY = component.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Convert delta to mm based on canvas scaling
      const deltaMMX = Math.round(deltaX / 10) * 0.5; // Adjust divisor based on canvas scaling
      const deltaMMY = Math.round(deltaY / 10) * 0.5;

      const newX = Math.round((origX + deltaMMX) / 0.5) * 0.5;
      const newY = Math.round((origY + deltaMMY) / 0.5) * 0.5;

      updateComponent(component.id, { x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleRemove = () => {
    if (confirm("Remove this component?")) {
      removeComponent(component.id);
    }
  };

  const handlePinClick = (pinId: string) => {
    onPinClick(component.id, pinId);
  };

  return (
    <div
      ref={drag}
      onMouseDown={handleDrag}
      className={`absolute cursor-move rounded border bg-blue-300 p-4 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{
        top: `${component.y}mm`,
        left: `${component.x}mm`,
        transform: `rotate(${component.rotation}deg)`,
      }}
      title={`Type: ${component.type}`}
    >
      {component.type}
      <button
        onClick={handleRemove}
        className="absolute right-0 top-0 text-sm text-red-500"
        title="Remove Component"
      >
        &times;
      </button>
      {/* Render Pins */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 transform">
        {component.pins.map((pin) => (
          <div
            key={pin.id}
            onClick={() => handlePinClick(pin.id)}
            className="m-1 h-2 w-2 cursor-pointer rounded-full bg-black"
            title={pin.name}
          ></div>
        ))}
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
        {component.pins.map((pin) => (
          <div
            key={pin.id}
            onClick={() => handlePinClick(pin.id)}
            className="m-1 h-2 w-2 cursor-pointer rounded-full bg-black"
            title={pin.name}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PCBDraggableComponent;
