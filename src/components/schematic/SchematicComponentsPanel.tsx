// src/components/schematic/SchematicComponentsPanel.tsx

import React from "react";
import DraggableComponent from "../shared/DraggableComponent";
import { Schematic_COMPONENT_TYPES } from "../../data/componentsConfig";

interface SchematicComponentsPanelProps {}

const SchematicComponentsPanel: React.FC<
  SchematicComponentsPanelProps
> = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-60 overflow-y-auto bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">Components</h2>
      {Schematic_COMPONENT_TYPES.map((comp) => (
        <DraggableComponent
          key={comp.type}
          id={comp.type}
          type="schematic-component"
          style={{ backgroundColor: "green", color: "white" }}
        >
          {comp.type}
        </DraggableComponent>
      ))}
    </div>
  );
};

export default SchematicComponentsPanel;
