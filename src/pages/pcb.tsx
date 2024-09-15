// src/pages/pcb.tsx

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PCBComponentsPanel from "../components/pcb/PCBComponentsPanel";
import PCBLayersPanel from "../components/pcb/PCBLayersPanel";
import PCBToolsPanel from "../components/pcb/PCBToolsPanel";
import PCBEditorCanvas from "../components/pcb/PCBEditorCanvas";
import { PCBEditorProvider } from "../context/PCBEditorContext";
import Link from "next/link";
import DetailsPanel from "../components/shared/DetailsPanel";

const PCBPage: React.FC = () => {
  return (
    <PCBEditorProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex h-screen">
          <PCBComponentsPanel />
          <PCBEditorCanvas />
          <PCBLayersPanel />
          <PCBToolsPanel />
          <DetailsPanel /> {/* Add DetailsPanel here */}
        </div>
        <Link
          href="/"
          className="absolute left-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
        >
          Back to Home
        </Link>
      </DndProvider>
    </PCBEditorProvider>
  );
};

export default PCBPage;
