// src/components/pcb/PCBDraggableComponent.tsx

import React from "react";
import DraggableComponent from "../shared/DraggableComponent";
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

  const handleRemove = () => {
    if (confirm("Remove this component?")) {
      removeComponent(component.id);
    }
  };

  const handlePinClick = (pinId: string) => {
    onPinClick(component.id, pinId);
  };

  return (
    <DraggableComponent
      id={component.id}
      type="pcb-component" // Ensure this is a defined string
      onRemove={handleRemove}
      style={{
        position: "absolute",
        top: `${component.y}mm`,
        left: `${component.x}mm`,
        transform: `rotate(${component.rotation}deg)`,
        backgroundColor: "blue",
        color: "white",
      }}
      isSelected={/* Logic to determine if selected */}
    >
      {component.type}
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
    </DraggableComponent>
  );
};

export default PCBDraggableComponent;
