// src/components/schematic/SchematicDraggableComponent.tsx

import React from "react";
import DraggableComponent from "../shared/DraggableComponent";
import { useEditorStore } from "../../context/editorStore";
import { ComponentType } from "../../types";

interface SchematicDraggableComponentProps {
  component: ComponentType;
}

const SchematicDraggableComponent: React.FC<
  SchematicDraggableComponentProps
> = ({ component }) => {
  const updateComponent = useEditorStore((state) => state.updateComponent);
  const removeComponent = useEditorStore((state) => state.removeComponent);

  const handleRemove = () => {
    if (confirm("Remove this component?")) {
      removeComponent(component.id);
    }
  };

  return (
    <DraggableComponent
      id={component.id}
      type="schematic-component"
      onRemove={handleRemove}
      style={{
        position: "absolute",
        top: `${component.y}px`,
        left: `${component.x}px`,
        backgroundColor: "green",
        color: "white",
      }}
    >
      {component.type}
      {/* Add schematic-specific details if necessary */}
    </DraggableComponent>
  );
};

export default SchematicDraggableComponent;
