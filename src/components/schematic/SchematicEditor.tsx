// src/components/SchematicEditor.tsx

import DraggableComponent from "@/components/schematic/SchematicDraggableComponent";
import { useEditorStore } from "@/context/editorStore";
import { ComponentType } from "@/types/pcb";
import React from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

const GRID_SIZE = 20; // pixels per grid unit

const SchematicEditor: React.FC = () => {
  const addComponent = useEditorStore((state) => state.addComponent);
  const components = useEditorStore((state) => state.components);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const editor = document.getElementById("editor-canvas");
      if (editor && offset) {
        const rect = editor.getBoundingClientRect();
        const x = Math.round((offset.x - rect.left) / GRID_SIZE) * GRID_SIZE;
        const y = Math.round((offset.y - rect.top) / GRID_SIZE) * GRID_SIZE;
        const newComponent: ComponentType = {
          id: uuidv4(),
          type: item.type,
          x,
          y,
        };
        console.log("Adding component:", newComponent); // Debugging
        addComponent(newComponent);
      } else {
        console.warn("Editor canvas not found or offset is undefined.");
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      id="editor-canvas"
      ref={drop}
      className="relative ml-60 mr-60 overflow-auto bg-white p-4"
      style={{
        minWidth: "2000px", // Ensure the canvas is large enough
        minHeight: "2000px",
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        backgroundImage:
          "linear-gradient(to right, #e0e0e0 1px, transparent 1px), linear-gradient(to bottom, #e0e0e0 1px, transparent 1px)",
      }}
    >
      {components.map((comp) => (
        <DraggableComponent key={comp.id} component={comp} />
      ))}
    </div>
  );
};

export default SchematicEditor;
