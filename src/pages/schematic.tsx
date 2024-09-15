// src/pages/schematic.tsx

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Link from "next/link";
import ComponentsPanel from "@/components/schematic/SchematicComponentsPanel";
import SchematicEditor from "@/components/schematic/SchematicEditor";
import ToolsPanel from "@/components/schematic/SchematicToolsPanel";
import DetailsPanel from "@/components/shared/DetailsPanel"; // Import the DetailsPanel

const SchematicPage: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <ComponentsPanel />
        <SchematicEditor />
        <ToolsPanel />
      </div>
      <DetailsPanel /> {/* Add the DetailsPanel */}
      <Link
        href="/"
        className="absolute left-4 top-4 rounded bg-gray-800 px-4 py-2 text-white"
      >
        Back to Home
      </Link>
    </DndProvider>
  );
};

export default SchematicPage;
