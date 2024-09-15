// src/components/pcb/PCBComponentsPanel.tsx

import React from "react";
import DraggableComponent from "../shared/DraggableComponent";
import { PCB_COMPONENT_TYPES } from "../../data/componentsConfig";

interface PCBComponentsPanelProps {}

const PCBComponentsPanel: React.FC<PCBComponentsPanelProps> = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 overflow-y-auto bg-gray-100 p-4">
      <h2 className="mb-4 text-xl font-bold">PCB Components</h2>
      {PCB_COMPONENT_TYPES.map((comp) => (
        <DraggableComponent
          key={comp.type}
          id={comp.type}
          type="pcb-component"
          style={{ backgroundColor: "blue", color: "white" }}
        >
          {comp.type}
        </DraggableComponent>
      ))}
    </div>
  );
};

export default PCBComponentsPanel;
